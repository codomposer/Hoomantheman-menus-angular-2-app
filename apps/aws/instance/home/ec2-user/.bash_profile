# .bash_profile
PATH=$PATH:$HOME/.local/bin:$HOME/bin
export PATH
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi
