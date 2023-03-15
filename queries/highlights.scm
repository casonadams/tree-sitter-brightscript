; good ref file:
; https://github.com/nvim-treesitter/nvim-treesitter/blob/master/queries/python/highlights.scm

["(" ")" "{" "}"] @punctuation.bracket

; TODO: support Object, and arrays
; ["(" ")" "[" "]" "{" "}"] @punctuation.bracket

[
  "print"
  "if"
  "then"
  "else"
  "else if"
  "end if"
  "return"
  "exit"
  "stop"
] @keyword

[
  "for"
  "For"
  "End For"
  "end for"
] @repeat

[
  "sub"
  "Sub"
  "end sub"
  "End Sub"
  "function"
  "Function"
  "end function"
  "End Function"
] @function

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


(as) @constant
(invalid_literal) @constant
(comment) @comment
(binary_expression) @operator
(integer_literal) @number
(string_literal) @string
(boolean_literal) @boolean
(identifier) @variable
