(cd caddy && sudo caddy run)

git submodule update

pnpm up -r

build-watch --force --verbose

(cd apps/web && pnpm run dev)

pnpm add -D @menus/ro-marketing-ui