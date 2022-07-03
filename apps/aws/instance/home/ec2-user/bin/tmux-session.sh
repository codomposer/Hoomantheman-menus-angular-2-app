#!/bin/sh
#TMUX=
tmux attach-session -t shell
STATUS=$(echo $?)
if [ $STATUS -ne 0 ]; then tmux new -s shell; fi
