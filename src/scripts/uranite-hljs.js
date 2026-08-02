
/*
Language: Uranite
Author: hxAri (hxari)
Description: Uranite - Website: https://github.com/uranite-lang/uranite
*/

function uranite(hljs) {
    const KEYWORDS = {
        keyword:
            'public private protect function class struct interface trait enum extends implements ' +
            'raises raise except try finally final Readonly match switch case async await ' +
            'return package import from use as delete new instanceof subclassof lambda unit ' +
            'backed property if elif else for while break continue yield pass ' +
            'defer export extern type const mut ref own move addressof unsafe virtual override ' +
            'abstract static native and or not is in self parent asm volatile output input clobber',
        type:
            'I8 I16 I32 I64 U8 U16 U32 U64 F32 F64 Int UInt Float Double Boolean String Char Byte Bytes ' +
            'Long Integer Void NoneType Object Callable Meta Future Generator',
        literal:
            'True False None'
    };

    const BLOCK_COMMENT = {
        className: 'comment',
        begin: /#\{/,
        end: /\}#/,
        contains: [
            {
                className: 'doctag',
                begin: /@[a-zA-Z]+/
            }
        ]
    };

    const LINE_COMMENT = {
        className: 'comment',
        begin: /#/,
        end: /$/,
        contains: [
            {
                className: 'doctag',
                begin: /@[a-zA-Z]+/
            }
        ]
    };

    const DOC_EXAMPLE = {
        begin: /^\s*>>>/,
        end: /$/,
        className: 'code',
        relevance: 0
    };

    const DOCSTRING = {
        className: 'string',
        variants: [
            { begin: /"""/, end: /"""/ },
            { begin: /'''/, end: /'''/ }
        ],
        contains: [
            {
                className: 'doctag',
                begin: /^\s*(Parameters|Returns|Raises|Generics|Complexity|Requires|Stability|Examples|See Also):/
            },
            DOC_EXAMPLE,
            hljs.BACKSLASH_ESCAPE
        ]
    };

    const STRING = {
        className: 'string',
        variants: [
            hljs.QUOTE_STRING_MODE,
            hljs.APOS_STRING_MODE
        ],
        contains: [
            {
                className: 'char.escape',
                begin: /\\(n|t|r|\\|0|'|"|x[0-9a-fA-F]{2})/
            }
        ]
    };

    const NUMBER = {
        className: 'number',
        variants: [
            { begin: /\b0[xX][0-9a-fA-F_]+\b/ },
            { begin: /\b0[bB][01_]+\b/ },
            { begin: /\b0[oO][0-7_]+\b/ },
            { begin: /\b\d[0-9_]*\.\d[0-9_]*([eE][+-]?\d+)?\b/ },
            { begin: /\b\d[0-9_]*\b/ }
        ],
        relevance: 0
    };

    const DECORATOR = {
        className: 'meta',
        begin: /@[a-zA-Z_][a-zA-Z0-9_]*/,
        relevance: 5
    };

    const OPERATOR = {
        className: 'operator',
        begin: /(\*\*=|<<=|>>=|\.\.\.|\.\.|=>|->|==|!=|<=|>=|\+=|-=|\*=|\/=|%=|&=|\|=|\^=|\*\*|\+\+|--|::|<<|>>|[+\-*\/%&|^~=<>])/,
        relevance: 0
    };

    const NAMESPACE = {
        begin: [
            /\b(package|import)\b/,
            /\s+/,
            /[a-zA-Z_][a-zA-Z0-9_.\-]*/
        ],
        beginScope: {
            1: 'keyword',
            3: 'title.class'
        }
    };

    const FROM_IMPORT = {
        begin: [
            /\b(from)\b/,
            /\s+/,
            /[a-zA-Z_][a-zA-Z0-9_.\-]*/,
            /\s+/,
            /\b(import)\b/
        ],
        beginScope: {
            1: 'keyword',
            3: 'title.class',
            5: 'keyword'
        }
    };

    const FUNCTION_DEF = {
        className: 'function',
        beginKeywords: 'function property',
        end: /[:;]/,
        excludeEnd: true,
        contains: [
            hljs.UNDERSCORE_TITLE_MODE,
            {
                className: 'params',
                begin: /\(/,
                end: /\)/,
                keywords: KEYWORDS,
                contains: [
                    STRING,
                    DOCSTRING,
                    NUMBER,
                    LINE_COMMENT
                ]
            }
        ]
    };

    const CLASS_DEF = {
        className: 'class',
        beginKeywords: 'class interface struct enum trait type',
        end: /[:;]/,
        excludeEnd: true,
        contains: [
            hljs.UNDERSCORE_TITLE_MODE
        ]
    };

    const ENUM_MEMBER = {
        begin: [
            /\b(unit)\b/,
            /\s+/,
            /[a-zA-Z_][a-zA-Z0-9_]*/
        ],
        beginScope: {
            1: 'keyword',
            3: 'variable.constant'
        }
    };

    const NEW_EXPR = {
        begin: [
            /\b(new)\b/,
            /\s+/,
            /[A-Z][a-zA-Z0-9_]*/
        ],
        beginScope: {
            1: 'keyword',
            3: 'title.class'
        }
    };

    const ASM_ARCH = {
        className: 'meta',
        begin: /^\s+(x86-64|x86|aarch64|arm|riscv64|riscv32|mips|wasm)\b/,
        relevance: 5
    };

    return {
        name: 'Uranite',
        aliases: ['urn', 'uranite'],
        keywords: KEYWORDS,
        contains: [
            BLOCK_COMMENT,
            LINE_COMMENT,
            DOCSTRING,
            STRING,
            NUMBER,
            DECORATOR,
            OPERATOR,
            FROM_IMPORT,
            NAMESPACE,
            NEW_EXPR,
            ENUM_MEMBER,
            FUNCTION_DEF,
            CLASS_DEF,
            ASM_ARCH
        ]
    };
}


export {
    uranite
}
