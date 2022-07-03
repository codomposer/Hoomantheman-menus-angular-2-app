#!/bin/sh
DIR_DEFAULT=$(pwd)
DIR="${DIR:-$DIR_DEFAULT}"

cd $DIR
tmux rename-window menu
tmux send-keys 'nvm use' C-m
cd $DIR
tmux split-window -v $SHELL
tmux send-keys 'nvm use' C-m
tmux send-keys 'build-watch --force --verbose' C-m
cd $DIR/apps/aws
tmux split-window -h $SHELL
tmux send-keys 'nvm use' C-m
tmux send-keys '' C-m
tmux select-pane -t 0
