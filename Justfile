# Global config

set dotenv-load

default:
    @just --list

# Internal helper
_compose *args:
    podman compose -f .devcontainer/compose.yml {{ args }}

[group('lifecycle')]
up *args:
    @just _compose up {{ args }}

[group('lifecycle')]
down *args:
    @just _compose down {{ args }}
    podman volume rm linksaver_next

[group('lifecycle')]
restart *args:
    @just _compose restart {{ args }}

[group('lifecycle')]
build:
    @just _compose build --no-cache

[group('lifecycle')]
logs *args:
    @just _compose logs -f {{ args }}

[group('app')]
migrate NAME:
    @echo "Running migration: {{NAME}}"
    @just _compose exec frontend bunx prisma migrate dev --name {{NAME}}

[group('lifecycle')]
frontend:
    @just _compose exec frontend bash
