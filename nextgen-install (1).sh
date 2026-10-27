#!/usr/bin/env bash
# Lampac NextGen — один скрипт: бекап → встановлення плагіна → відкат.
# Використання:  ./nextgen-install.sh [install|rollback|uninstall|status]
# init.conf, пароль, AdminPanel, module/, БД НЕ змінюються.
set -euo pipefail
BASE=${BASE:-/home/ubuntu/lampac-docker}
BK=${BK:-/home/ubuntu/lampac-backups}
CMD=${1:-install}
cd "$BASE"

find_www() {
  local id src
  for id in $(docker compose ps -q); do
    src=$(docker inspect -f '{{range .Mounts}}{{.Source}}|{{.Destination}}{{"\n"}}{{end}}' "$id" \
          | awk -F'|' '$2 ~ /wwwroot$/ {print $1; exit}')
    [ -n "$src" ] && { echo "$src"; return; }
  done
  find "$BASE" -maxdepth 3 -type d -name wwwroot 2>/dev/null | head -1
}

backup() {
  local stamp dest i=0 img
  stamp=$(date +%Y%m%d-%H%M%S); dest="$BK/$stamp"; mkdir -p "$dest"
  docker compose config > "$dest/compose.resolved.yml" 2>/dev/null || true
  docker compose images > "$dest/images.txt" || true
  docker compose ps -q | while read -r id; do docker inspect "$id" > "$dest/inspect-$id.json"; done
  for img in $(docker compose images -q | sort -u); do
    docker tag "$img" "lampac-nextgen-backup:$stamp-$i"; i=$((i+1))
  done
  docker compose stop
