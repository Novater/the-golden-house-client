export default class Token {
  constructor() {
    this.inst = null
    this.tokens = []
    this.TOKEN_TYPES = {
      NUM: 'NUM',
      LPAREN: 'LPAREN',
      RPAREN: 'RPAREN',
      OPERATOR: 'OPERATOR',
    }
  }

  static getInst = () => {
    if (!this.inst) this.inst = new Token()

    return this.inst
  }

  static getPrecedence = (op) => {
    const opToPrecendenceMap = {
      '<': 1,
      '>': 1,
      '>=': 1,
      '<=': 1,
      '==': 1,
      '!=': 1,
      '||': 1,
      '&&': 1,
      '+': 2,
      '-': 2,
      '*': 3,
      '/': 3,
    }

    return opToPrecendenceMap[op] || -1
  }

  getTokenTypes = () => {
    return this.TOKEN_TYPES
  }

  tokenize = (str) => {
    this.tokens = []
    console.log(str)
    str = str.trim()
    let s = ''

    for (var i = 0; i < str.length; i += 1) {
      s += str[i]
      console.log(s)
      const peek = str[i + 1]

      if (this.#isNum(s) && !this.#isNum(s + peek)) {
        this.tokens.push({ type: this.TOKEN_TYPES.NUM, value: s.trim() })
        s = ''
      }

      if (s.trim() == '(' || s.trim() == ')') {
        s.trim() == '('
          ? this.tokens.push({ type: this.TOKEN_TYPES.LPAREN })
          : this.tokens.push({ type: this.TOKEN_TYPES.RPAREN })
        s = ''
      }

      if (
        this.#isOperator(s.trim()) &&
        !this.#isOperator(s.trim() + peek.trim())
      ) {
        this.tokens.push({ type: this.TOKEN_TYPES.OPERATOR, value: s.trim() })
        s = ''
      }
    }

    return this.tokens
  }

  #isNum = (str) => {
    return !isNaN(parseFloat(str)) && isFinite(str)
  }

  #isOperator = (str) => {
    const operators = [
      '<',
      '>',
      '>=',
      '<=',
      '==',
      '!=',
      '||',
      '&&',
      '+',
      '-',
      '*',
      '/',
    ]

    return operators.reduce((matchFound, operator) => {
      return str == operator || matchFound
    }, false)
  }
}
