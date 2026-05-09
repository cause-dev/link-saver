# ============================================
# Stage 1: Development
# ============================================
ARG BUN_VERSION=1
FROM oven/bun:${BUN_VERSION}-debian AS development

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    bash \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLE=1 \
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true

USER bun

EXPOSE 3000

# ============================================
# Stage 2: Build
# ============================================
FROM oven/bun:${BUN_VERSION}-debian AS build

WORKDIR /app

COPY package.json bun.lock* ./

RUN --mount=type=cache,target=/home/bun/.bun/install/cache \
    bun install --frozen-lockfile --no-dev --no-project

COPY . .

ENV NEXT_TELEMETRY_DISABLE=1 \
    NODE_ENV=production

RUN bun run build

# ============================================
# Stage 3: Production
# ============================================
FROM oven/bun:${BUN_VERSION}-alpine AS production

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLE=1

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

USER bun

EXPOSE 3000

CMD ["bun", "run", "server.js"]