module.exports = grammar({
  name: 'brightscript',

  conflicts: $ => [
    [$.assignment_statement, $.expression],
    [$.assignment_statement, $.binary_expression],
    [$.statement, $.binary_expression],
    [$.unary_expression, $.binary_expression],
    [$.return_statement, $.binary_expression],
  ],

  rules: {
    // The main entry point of the grammar
    source_file: $ => repeat(choice(
      $.function_declaration,
      $.statement,
      $.comment,
      $.newline,
    )),

    // Functions
    function_declaration: $ => seq(
      choice('function', 'Function'),
      $.identifier,
      '(',
      optional($.parameters),
      ')',
      optional(seq($.as, $.type)),
      $.newline,
      repeat($.statement),
      optional($.return_statement),
      choice('end function', 'End Function'),
      $.newline
    ),

    subroutine_declaration: $ => seq(
      choice('sub', 'Sub'),
      $.identifier,
      '(',
      optional($.parameters),
      ')',
      optional(seq($.as, $.type)),
      $.newline,
      repeat($.statement),
      optional($.return_statement),
      choice('end sub', 'End Sub'),
      $.newline
    ),

    parameters: $ => commaSep1($.parameter),

    parameter: $ => seq(
      $.identifier,
      optional(seq($.as, $.type))
    ),

    type: $ => choice(
      "bool",
      "Bool",
      "boolean",
      "Boolean",
      "double",
      "Double",
      "dynamic",
      "Dynamic",
      "float",
      "Float",
      "integer",
      "Integer",
      "interface",
      "Interface",
      "long",
      "Long",
      "longInteger",
      "LongInteger",
      "object",
      "Object",
      "string",
      "String",
    ),

    invalid_literal: $ => choice(
      "Invalid",
      "invalid",
    ),

    keyword_literal: $ => choice(
      "exit",
      "stop",
      "STOP",
    ),

    as: $ => choice(
      "As",
      "as"
    ),

    // Statements
    statement: $ => choice(
      $.print_statement,
      $.if_statement,
      $.loop_statement,
      $.assignment_statement,
      $.expression
    ),

    print_statement: $ => seq(
      'print',
      commaSep1($.expression),
      $.newline
    ),

    if_statement: $ => seq(
      'if',
      $.expression,
      'then',
      $.newline,
      repeat($.statement),
      optional(choice($.else_if_statement, $.else_statement)),
      'end if',
      $.newline
    ),

    else_if_statement: $ => seq(
      'else if',
      $.expression,
      'then',
      $.newline,
      repeat($.statement),
      optional($.else_statement)
    ),

    else_statement: $ => seq(
      'else',
      $.newline,
      repeat($.statement)
    ),

    loop_statement: $ => choice(
      $.for_loop,
    ),

    for_loop: $ => seq(
      choice('for', 'For'),
      $.identifier,
      '=',
      $.expression,
      choice('to', 'To'),
      $.expression,
      optional(seq(choice('step', 'Step'), $.expression)),
      repeat($.statement),
      choice('end for', 'End For'),
    ),

    assignment_statement: $ => seq(
      $.identifier,
      '=',
      $.expression
    ),

    // Expressions
    expression: $ => choice(
      $.identifier,
      $.literal,
      $.binary_expression,
      $.keyword_literal,
      $.unary_expression
    ),

    binary_expression: $ => prec.left(choice(
      seq($.expression, '+', $.expression),
      seq($.expression, '-', $.expression),
      seq($.expression, '*', $.expression),
      seq($.expression, '/', $.expression),
      seq($.expression, '<', $.expression),
      seq($.expression, '>', $.expression),
      seq($.expression, '<=', $.expression),
      seq($.expression, '>=', $.expression),
      seq($.expression, '=', $.expression),
      seq($.expression, '<>', $.expression),
      seq($.expression, 'and', $.expression),
      seq($.expression, 'or', $.expression),
      seq($.expression, 'not', $.expression),
      seq($.expression, 'mod', $.expression)
    )),

    unary_expression: $ => prec.left(choice(
      seq('-', $.expression),
      seq('not', $.expression)
    )),

    literal: $ => choice(
      $.integer_literal,
      $.float_literal,
      $.string_literal,
      $.boolean_literal,
      $.invalid_literal
    ),

    return_statement: $ => seq(
      "return",
      optional(
        repeat(
            $.expression
        )
      )
    ),

    integer_literal: $ => token(/[0-9]+/),
    float_literal: $ => token(/[0-9]+\.[0-9]+/),
    string_literal: $ => token(/"([^"\\]|\\.)*"/),
    boolean_literal: $ => choice('true', 'false'),
    identifier: $ => /[A-Za-z_]+/,
    newline: $ => /\r?\n/,
    comment: $ => choice(
      token(/'.*/),
      token(/rem.*/),
      token(/REM.*/)
    ),
  }
});

function commaSep1(rule) {
  return sep1(rule, ',');
}

function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)));
}
