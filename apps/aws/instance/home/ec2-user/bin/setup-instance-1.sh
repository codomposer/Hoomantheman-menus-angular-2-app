#!/bin/sh
sudo yum update -y
if ! type git >/dev/null 2>&1; then
  cd ~
  sudo yum install git -y
fi
if ! type tmux >/dev/null 2>&1; then
  cd ~
  sudo yum install tmux -y
fi
if ! type nvm >/dev/null 2>&1; then
  cd ~
  if [ ! -d ~/.nvm ]; then
    git clone https://github.com/nvm-sh/nvm.git .nvm
  fi
  cd ~/.nvm
  git pull
  . ./nvm.sh
  cd ~
fi
if ! type direnv >/dev/null 2>&1; then
  cd ~
  curl -sfL https://direnv.net/install.sh | bash
  sudo mv ~/bin/direnv /usr/local/bin/direnv
  eval "$(direnv hook bash)"
fi
if ! type gcc >/dev/null 2>&1; then
  cd ~
  sudo yum groupinstall "Development Tools" -y
fi
if ! type ncurses-devel >/dev/null 2>&1; then
  cd ~
  sudo yum install ncurses-devel -y
fi
if ! type tig >/dev/null 2>&1; then
  if [ ! -d ~/tig ]; then
    cd ~
    git clone https://github.com/jonas/tig.git
  fi
  cd ~/tig
  make configure
  ./configure
  make
  sudo make install
  cd ~
fi
if ! type lynx >/dev/null 2>&1; then
  sudo yum install lynx -y
fi
