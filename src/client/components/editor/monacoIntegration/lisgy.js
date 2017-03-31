import monarchDefinition from './lisgy.monarch'

export default function (monaco) {
  monaco.languages.register({
    id: 'lisgy'
  })
  monaco.languages.setMonarchTokensProvider('lisgy', monarchDefinition)
  monaco.languages.setLanguageConfiguration('lisgy', {
    brackets: [
      ['(', ')'],
      ['[', ']'],
      ['{', '}']
    ],
    comments: {
      lineComment: ';'
    },
    autoClosingPairs: [
      { open: '(', close: ')' },
      { open: '[', close: ']' },
      { open: '{', close: '}' },
      { open: '"', close: '"' }
    ]
  })
}
