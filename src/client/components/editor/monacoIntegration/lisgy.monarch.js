export default {
  // Set defaultToken to invalid to see what you do not tokenize yet
  // defaultToken: 'invalid',

  keywords: [
    'const', 'def', 'defco', 'defcop', 'deftype', 'import', 'lambda', 'let', 'port'
  ],

  operators: [],

  builtins: [],

  brackets: [
    ['#(',')','delimeter.parenthesis.lambda'],
    ['(',')','delimeter.parenthesis'],
    ['{','}','delimiter.curly'],
    ['[',']','delimiter.square']
  ],

  // we include these common regular expressions
  symbols:  /[=><~&|+\-*\/%@#]+/,

  // C# style strings
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [/[a-z_][\w\-\.']*/, { cases: { '@builtins': 'predefined.identifier',
                                      '@keywords': 'keyword',
                                      '@default': 'identifier' } }],
      [/[A-Z][\w\-\.']*/, 'type.identifier' ],
      [/[:][\w\-\.']*/, 'string.identifier' ],
      [/[$?][\w\-\.']*/, 'constructor.identifier' ],

      // whitespace
      { include: '@whitespace' },

      // arguments of anonymous lambda functions
      [/%\d+/, 'variable.name'],

      // delimiters and operators
      [/#?[()\[\]]/, '@brackets'],
      [/@symbols/, { cases: { '@operators': 'predefined.operator',
                              '@default'  : 'operator' } } ],

      // numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/\d+/, 'number'],

      // delimiter: after number because of .\d floats
      [/[,.]/, 'delimiter'],

      // strings
      [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
      [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],

      // user values
      [/\{/, { token: 'delimiter.curly', bracket: '@open', next: '@uservalue' } ],
    ],

    uservalue: [
      [/:[^ ]*/, 'attribute.name'],
      [/[^\\\ }]+/, 'attribute.value' ],
      [/\}/,       { token: 'delimiter.curly', bracket: '@close', next: '@pop' } ],
      [/\\\}/,     'string.escape'],
      [/./,        'string']  // recover
    ],

    map: [
      [/.*/, 'string']
    ],

    string: [
      [/[^\\"]+/,  'string'],
      [/@escapes/, 'string.escape'],
      [/\\./,      'string.escape.invalid'],
      [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/;.*$/,    'comment'],
    ],
  },
};
