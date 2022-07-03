# .bashrc
# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions

. "$HOME/bin/nvm-source.sh"
for f in ~/.bashrc.d/*; do . "$f"; done
if [ $TMUX ]; then
  eval "$(direnv hook bash)"
  eval `ssh-agent -s`
  ssh-add ~/.ssh/id
fi
