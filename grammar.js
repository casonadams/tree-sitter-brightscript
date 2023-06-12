module.exports = grammar({
    name: 'brightscript',

    conflicts: $ => [
        [$.statement, $.binary_expression],
        [$.unary_expression, $.binary_expression],
        [$.return_statement, $.binary_expression],
        [$.print_statement, $.binary_expression],
    ],

    rules: {
        // The main entry point of the grammar
        source_file: $ => repeat(choice(
            $.function_declaration,
            $.subroutine_declaration,
            $.statement,
            $.comment,
        )),

        // Functions
        function_declaration: $ => seq(
            choice('function', 'Function'),
            $.identifier,
            '(',
            optional($.parameters),
            ')',
            optional(seq($.as, $.type)),
            repeat($.statement),
            optional($.return_statement),
            choice('end function', 'End Function'),
        ),

        subroutine_declaration: $ => seq(
            choice('sub', 'Sub'),
            $.identifier,
            '(',
            optional($.parameters),
            ')',
            optional(seq($.as, $.type)),
            repeat($.statement),
            optional($.return_statement),
            choice('end sub', 'End Sub'),
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

        _in: $ => choice(
            "In",
            "in"
        ),

        // Statements
        statement: $ => choice(
            $.print_statement,
            $.if_statement,
            $.loop_statement,
            $.expression
        ),

        print_statement: $ => seq(
            choice(
                "print",
                "Print",
                "?",
            ),
            $.expression,
        ),

        if_statement: $ => seq(
            choice('if', "If"),
            $.expression,
            choice('then', "Then"),
            repeat($.statement),
            optional(choice($.else_if_statement, $.else_statement)),
            choice('end if', "End If"),
        ),

        else_if_statement: $ => seq(
            choice('else if', "Else If"),
            $.expression,
            choice('then', "Then"),
            repeat($.statement),
            optional($.else_statement)
        ),

        else_statement: $ => seq(
            choice('else', 'Else'),
            repeat($.statement)
        ),

        loop_statement: $ => choice(
            $.for_loop,
            $.for_each_loop,
            $.while_loop,
        ),

        while_loop: $ => seq(
            choice('while', 'While'),
            $.expression,
            repeat($.statement),
            choice('end while', 'End While'),
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

        for_each_loop: $ => seq(
            choice('for each', 'For Each'),
            $.identifier,
            choice('in', 'In'),
            $.identifier,
            repeat($.statement),
            choice('end for', 'End For'),
        ),

        // Expressions
        expression: $ => choice(
            $.identifier,
            $.binary_expression,
            $.keyword_literal,
            $.unary_expression,
            $.literal,
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
            $.invalid_literal,
            $.map,
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
        map: $ => seq(
            '{',
            optional($.mapPairList),
            '}'
        ),
        mapPairList: $ => seq(
            $.mapPair,
            repeat(
                seq(optional(','), $.mapPair)
            )
        ),
        mapPair: $ => seq(
            $.statement,
            ':',
            choice(
                $.function_declaration,
                $.subroutine_declaration,
                $.literal,
            ),
        ),
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
