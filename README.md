# tree-sitter-brightscript

This is still a work in progress.  It is a starting point to build out treesitter grammar for brightscript.

## setup

### nvim

- requires [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)

```lua
-- ~/.config/nvim/init.lua
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.brightscript = {
  install_info = {
    url = "https://github.com/casonadams/tree-sitter-brightscript.git",
    files = {"src/parser.c"},
    branch = "main",
    generate_requires_npm = false,
    requires_generate_from_grammar = false,
  },
  filetype = "brs",
}
```

### helix

```toml
# ~/.config/helix/languages.toml

use-grammars = { only = [ "brightscript" ] }

[[grammar]]
name = "brightscript"
source = { git = "https://github.com/casonadams/tree-sitter-brightscript.git", rev = "main" }
```

## highlights

### nvim

```sh
mkdir -p ~/.local/share/nvim/site/pack/packer/start/nvim-treesitter/queries/brightscript

cp queries/highlights.scm ~/.local/share/nvim/site/pack/packer/start/nvim-treesitter/queries/brightscript
```

### helix

mkdir -p ~/.config/helix/runtime/queries/brightscript

```sh
cp queries/highlights.scm ~/.config/helix/runtime/queries/brightscript/highlights.scm
```
