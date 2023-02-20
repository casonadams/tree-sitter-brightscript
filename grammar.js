module.exports = grammar({
  name: 'brightscript',

  conflicts: $ => [
    [$.assignment_statement, $.expression],
    [$.assignment_statement, $.binary_expression],
    [$.statement, $.binary_expression],
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
      optional(seq(choice("as", "As"), $.type)),
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
      optional(seq(choice("as", "As"), $.type)),
      $.newline,
      repeat($.statement),
      optional($.return_statement),
      choice('end sub', 'End Sub'),
      $.newline
    ),

    parameters: $ => commaSep1($.parameter),

    parameter: $ => seq(
      $.identifier,
      optional(seq(choice("as", "As"), $.type))
    ),

    type: $ => choice(
      'integer',
      'float',
      'string',
      'boolean',
      'dynamic'
    ),

    // Statements
    statement: $ => choice(
      $.print_statement,
      $.if_statement,
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
      $.boolean_literal
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
    invalid: $ => "invalid",
    comment: $ => token(/'.*/),
  }
});

function commaSep1(rule) {
  return sep1(rule, ',');
}

function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)));
}
