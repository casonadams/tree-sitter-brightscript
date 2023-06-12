; good ref file:
; https://github.com/nvim-treesitter/nvim-treesitter/blob/master/queries/python/highlights.scm

["(" ")"] @punctuation.bracket
["{" "}"] @punctuation.bracket
["[" "]"] @punctuation.bracket

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
  "For Each"
  "End For"
  "for each"
  "end for"
  "while"
  "end while"
  "While"
  "End While"
  "continue for"
  "Continue For"
  "Continue While"
  "continue while"
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
 "--"
 "++"
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

(as) @keyword
(in) @keyword
(invalid_literal) @constant
(comment) @comment
(integer_literal) @number
(string_literal) @string
(boolean_literal) @boolean
(identifier) @variable
(type) @type
