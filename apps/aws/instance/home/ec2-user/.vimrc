" Sane vim defaults for ArchLabs
" execute pathogen#infect()

" Arch defaults
runtime! archlinux.vim

set modeline
set clipboard^=unnamedplus  " system clipboard (requires +clipboard)
set number                  " enable line numbers
set confirm                 " ask confirmation for some things, like save before quit, etc.
set wildmenu                " Tab completion menu when using command mode
"set expandtab               " Tab key inserts spaces not tabs
set tabstop=2           " spaces to enter for each tab
set shiftwidth=2            " amount of spaces for indentation
set shortmess+=aAcIws       " Hide or shorten certain messages

" enable mouse.. sgr is better but not every term supports it
set mouse=a
if has('mouse_sgr')
    set ttymouse=sgr
endif

" syntax highlighting with true colors in the terminal
syntax enable
if has('termguicolors') && $DISPLAY !=? ''
    set termguicolors
endif
"colorscheme darkblue
"colorscheme blackboard
"color dracula

" paste while in insert mode
inoremap <silent><C-v> <Esc>:set paste<CR>a<C-r>+<Esc>:set nopaste<CR>a

" alt defaults
nnoremap 0 ^
nnoremap Y y$
nnoremap n nzzzv
nnoremap N Nzzzv
nnoremap <Tab> ==j

" j=gj k=gk but preserve numbered jumps ie. 12j or 30k
nnoremap <buffer><silent><expr>j v:count ? 'j' : 'gj'
nnoremap <buffer><silent><expr>k v:count ? 'k' : 'gk'

" Reload changes if file changed outside of vim requires autoread
augroup load_changed_file
    autocmd!
    autocmd FocusGained,BufEnter * if mode() !=? 'c' | checktime | endif
    autocmd FileChangedShellPost * echo "Changes loaded from file"
augroup END

" when quitting a file, save the cursor position
augroup save_cursor_position
    autocmd!
    autocmd BufReadPost * call setpos(".", getpos("'\""))
augroup END

for f in split(glob('~/.vim/autoload/*.vim'), '\n')
    exe 'source' f
endfor

