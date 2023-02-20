[
  "print"
  "if"
  "then"
  "else"
  "else if"
  "end if"
  "return"
] @keyword

[
  "as"
  "As"
] @constant

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

(invalid) @constant
(comment) @comment
(binary_expression) @operator
(integer_literal) @number
(string_literal) @string
(boolean_literal) @boolean
(identifier) @variable
