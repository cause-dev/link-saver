ARG BUN_VERSION=1-alpine

FROM oven/bun:${BUN_VERSION}

RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache git curl bash

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLE=1 \
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true

COPY package.json bun.lock* ./

RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]
