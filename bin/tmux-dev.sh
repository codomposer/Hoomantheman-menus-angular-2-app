#!/bin/sh
DIR_DEFAULT=$(pwd)
DIR="${DIR:-$DIR_DEFAULT}"

if [ "$(whoami)" == ec2-user ]; then
  cd $DIR
  tmux send-keys 'nvm use' C-m
  cd $DIR/apps/aws
  tmux split-window -v $SHELL
  tmux send-keys 'nvm use' C-m
  tmux send-keys '' C-m
  cd $DIR
  tmux split-window -h $SHELL
  tmux send-keys 'nvm use' C-m
  tmux send-keys 'build-watch --force --verbose' C-m
  tmux select-pane -t 0
else
  cd $DIR
  tmux rename-window menu
  tmux send-keys 'nvm use' C-m
  cd $DIR
  tmux split-window -v $SHELL
  tmux send-keys 'nvm use' C-m
  tmux send-keys 'build-watch --force --verbose' C-m
  cd $DIR/apps/web
  tmux split-window -h $SHELL
  tmux send-keys 'nvm use' C-m
  tmux send-keys 'pnpm run dev' C-m
  tmux select-pane -t 0
  cd $DIR/apps/backoffice-spa
  tmux split-window -h $SHELL
  tmux send-keys 'nvm use' C-m
  tmux send-keys '' C-m
  tmux select-pane -t 0
fi
