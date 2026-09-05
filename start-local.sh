#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
portfolio_pid=""
disney_pid=""

cleanup() {
    if [[ -n "$portfolio_pid" ]]; then
        kill "$portfolio_pid" 2>/dev/null || true
    fi
    if [[ -n "$disney_pid" ]]; then
        kill "$disney_pid" 2>/dev/null || true
    fi
}

trap cleanup EXIT INT TERM

python3 -m http.server 4173 --bind 127.0.0.1 --directory "$project_root" &
portfolio_pid=$!

(
    cd "$project_root/DISNEY HTML ONLY THEMED"
    exec npm run dev -- --port 5176
) &
disney_pid=$!

printf 'Portfolio: http://localhost:4173/\n'
printf 'Disney demo: http://localhost:5176/\n'
printf 'Press Ctrl+C to stop both servers.\n'

wait
