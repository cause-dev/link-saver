# Global config
set dotenv-load := true

default:
  @just --list

# Lifecycle
compose args:
  podman compose {{args}}

dev:
  code .
  podman compose up

up *args:
  podman compose up {{args}}

down *args:
  podman compose down {{args}}
  podman volume ls -q | grep -E '_[a-f0-9]{32,}$' | xargs -r podman volume rm

restart *args:
  podman compose restart {{args}}

logs *args:
  podman compose logs -f {{args}}

frontend:
  podman compose exec frontend bash
