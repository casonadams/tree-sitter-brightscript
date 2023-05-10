# tree-sitter-brightscript

This is still a work in progress.  It is a starting point to build out treesitter grammar for brightscript.

## setup

**Note** this type of setup is only needed until this tree-sitter project can make its way into nvim-treesitter

### nvim

- requires [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)
- filetype must be `brs`

```lua
-- ~/.config/nvim/ftdetect/brs.lua
local api = vim.api

api.nvim_command("autocmd BufNewFile,BufFilePost,BufRead *.brs setfiletype brs")
```

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

ln -s $(pwd)/queries/highlights.scm ~/.local/share/nvim/site/pack/packer/start/nvim-treesitter/queries/brightscript
```

### helix

**Requires that helix has been cloned and the runtime/ dir has been copied to ~/.config/helix/runtime**

```sh
# from helix root dir
mkdir -p ~/.config/helix
cp -a runtime ~/.config/helix/
```

```sh
# from tree-sitter-brightscript root dir
mkdir -p ~/.config/helix/runtime/queries/brightscript
ln -s $(pwd)/queries/highlights.scm ~/.config/helix/runtime/queries/brightscript/highlights.scm
```

- Then build an and fetch

```sh
hx -g fetch
hx -g build
```
