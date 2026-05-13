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
migrate:
    @just _compose exec backend uv run python manage.py makemigrations
    @just _compose exec backend uv run python manage.py migrate

[group('lifecycle')]
frontend:
    @just _compose exec frontend bash
