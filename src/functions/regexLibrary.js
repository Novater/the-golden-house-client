import _ from 'lodash'
import ExpressionParser from './algoparse/parser'
import Token from './algoparse/token'
export default class RegexLibrary {
  static matchExact({ match, matchWith }) {
    return match === matchWith
  }

  static matchRough({ match, matchWith }) {
    const matchAttempt = match.match(`.*${matchWith}.*`)
    return matchAttempt && matchAttempt[0]
  }

  static matchTextFormula({ match, matchWith }) {
    const matchAttempt = match.match(matchWith)
    return matchAttempt && matchAttempt[0]
  }

  static matchNumberFormula({ match, matchWith, keys, rec }) {
    let fixedMatchWith
    for (const key of keys) {
      fixedMatchWith = matchWith.replaceAll(`{${key}}`, _.get(rec, key))
    }
    const parser = ExpressionParser.getInstance(Token.getInst())
    const tokenizedMatch = parser.tokenize(fixedMatchWith)
    console.log('tokenizedMatch', tokenizedMatch)

    return parser.evaluate()
  }
}
