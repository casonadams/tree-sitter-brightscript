; good ref file:
; https://github.com/nvim-treesitter/nvim-treesitter/blob/master/queries/python/highlights.scm

["(" ")"] @punctuation.bracket
["{" "}"] @punctuation.bracket

; TODO: support Object, and arrays
; ["(" ")" "[" "]" "{" "}"] @punctuation.bracket

[
  "print"
  "Print"
  "?"
  "if"
  "then"
  "else"
  "else if"
  "end if"
  "If"
  "Then"
  "Else"
  "Else If"
  "End If"
  "return"
  "exit"
  "stop"
  "STOP"
] @keyword

[
  "sub"
  "Sub"
  "end sub"
  "End Sub"
  "function"
  "Function"
  "end function"
  "End Function"
] @keyword

[
  "bool"
  "Bool"
  "boolean"
  "Boolean"
  "double"
  "Double"
  "dynamic"
  "Dynamic"
  "float"
  "Float"
  "integer"
  "Integer"
  "interface"
  "Interface"
  "long"
  "Long"
  "longInteger"
  "LongInteger"
  "object"
  "Object"
  "step"
  "Step"
  "string"
  "String"
  "to"
  "To"
] @type.builtin

[
 "="
 ">"
 "*"
 "+"
 "-"
 "/"
 "<"
 "<="
 "<>"
 "="
 ">"
 ">="
 "and"
 "mod"
 "not"
 "or"
] @operator

[
 "in"
 "In"
] @constant

(as) @constant
(invalid_literal) @constant
(comment) @comment
(integer_literal) @number
(string_literal) @string
(boolean_literal) @boolean
(identifier) @variable
(loop_statement) @repeat
(type) @type
