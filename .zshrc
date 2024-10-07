
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  if [[ -f .nvmrc && "$(nvm version)" != "$(cat .nvmrc)" ]]; then
    nvm use
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
