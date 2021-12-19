import Token from './token'
export default class ExpressionParser {
  constructor(tokenizer) {
    this.instance = null
    this.tokenizer = tokenizer
    this.tokenTypes = tokenizer.getTokenTypes()
  }

  static getInstance = () => {
    if (!this.instance) this.instance = new ExpressionParser(Token.getInst())
    return this.instance
  }

  tokenize = (str) => {
    this.tokens = this.tokenizer.tokenize(str)
  }

  evaluate = () => {
    let outStack = []
    let opStack = []

    while (this.tokens.length > 0) {
      let thisToken = this.tokens.shift()
      const { type, value } = thisToken

      switch (type) {
        case this.tokenTypes.NUM: {
          outStack.push(thisToken)
          break
        }
        case this.tokenTypes.LPAREN: {
          opStack.push(thisToken)
          break
        }
        case this.tokenTypes.RPAREN: {
          let peek = opStack[opStack.length - 1]
          while (peek.type !== this.tokenTypes.LPAREN) {
            let operator = opStack.pop()
            let secondValue = outStack.pop()
            let firstValue = outStack.pop()

            let output = this.#evaluateExpression({
              firstValue,
              secondValue,
              operator,
            })
            outStack.push({
              type: this.tokenTypes.NUM,
              value: output,
            })

            // do the statement evaluation
            peek = opStack[opStack.length - 1]
          }

          // pop left paren
          opStack.pop()
          break
        }

        case this.tokenTypes.OPERATOR: {
          let peek = opStack[opStack.length - 1]
          while (
            opStack.length > 0 &&
            Token.getPrecedence(value) <= Token.getPrecedence(peek.value)
          ) {
            let operator = opStack.pop()
            let secondValue = outStack.pop()
            let firstValue = outStack.pop()

            // do statement evaluation
            let output = this.#evaluateExpression({
              firstValue,
              secondValue,
              operator,
            })
            outStack.push({
              type: this.tokenTypes.NUM,
              value: output,
            })
          }
          opStack.push(thisToken)
          break
        }
        default:
          break
      }
    }

    while (opStack.length > 0) {
      let operator = opStack.pop()
      let secondValue = outStack.pop()
      let firstValue = outStack.pop()

      // do statement evaluation
      let output = this.#evaluateExpression({
        firstValue,
        secondValue,
        operator,
      })
      outStack.push({
        type: this.tokenTypes.NUM,
        value: output,
      })
    }

    return outStack[0].value
  }

  #evaluateExpression = ({ firstValue, secondValue, operator }) => {
    return eval(`${firstValue.value} ${operator.value} ${secondValue.value}`)
  }
}
