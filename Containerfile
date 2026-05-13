# =========================
# Global Build Arguments
# =========================
ARG BUN_IMAGE=oven/bun:1-alpine
ARG NODE_RUNTIME_IMAGE=node:24-alpine

# =========================
# Stage 1: Development
# Alpine + Bun, optimized for hot reload / devcontainer
# =========================
FROM ${BUN_IMAGE} AS development

RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache git curl bash libstdc++

WORKDIR /app

ENV NODE_ENV=development \
    HOST=0.0.0.0 \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1 \
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true

COPY package.json bun.lock* ./

RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]

# =========================
# Stage 2: Production Builder
# Bun installs deps + builds Next.js standalone output
# =========================
FROM ${BUN_IMAGE} AS prod-builder

WORKDIR /app

COPY package.json bun.lock* ./

RUN --mount=type=cache,target=/root/.bun \
    bun install --production --frozen-lockfile

COPY . .

# Build Next.js (requires output: 'standalone' in next.config.js)
RUN --mount=type=cache,target=/app/.next/cache \
    bun run build

# Validate the standalone output exists
RUN test -f .next/standalone/server.js || \
    (echo "ERROR: Next.js standalone build failed" && exit 1) && \
    test -d .next/static || \
    (echo "WARNING: .next/static missing" && exit 1)


# =========================
# Stage 3: Production Runtime
# Minimal Node image — no Bun, no build tools
# Only standalone server.js + static assets
# =========================
FROM ${NODE_RUNTIME_IMAGE} AS production

LABEL maintainer="cause.dev@proton.me" \
      version="1.0.0" \
      description="Next.js production runtime (standalone)"

ENV NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy standalone build (includes bundled node_modules)
COPY --from=prod-builder --chown=${USER_UID}:${USER_GID} \
    /app/.next/standalone ./

# Copy static assets and public folder
COPY --from=prod-builder --chown=${USER_UID}:${USER_GID} \
    /app/.next/static ./.next/static

COPY --from=prod-builder --chown=${USER_UID}:${USER_GID} \
    /app/public ./public

USER ${USER_UID}

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "server.js"]