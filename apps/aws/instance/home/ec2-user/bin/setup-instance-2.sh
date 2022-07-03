#!/bin/sh
if [ ! -f ~/.ssh/id ]; then
  ssh-keygen -q -t rsa -N '' -f ~/.ssh/id
  eval $(ssh-agent -s)
  ssh-add ~/.ssh/id
fi
if ! type nvm >/dev/null 2>&1; then
  . "$HOME/bin/nvm-source.sh"
fi
cat ~/.ssh/id.pub
if [ ! -d ~/menus-angular-2-app ]; then
  cd ~
  git clone git@bitbucket.org:Hoomantheman/menus-angular-2-app.git
  cd ~/menus-angular-2-app
  cp .env.sample .env
  cp ./apps/aws/.env.sample ./apps/aws/.env
  touch ./apps/aws/.env
  touch ./apps/web/.env
  direnv allow
  nvm i
  npm i -g pnpm
  pnpm i
  cd ~
fi
