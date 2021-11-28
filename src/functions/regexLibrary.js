import _ from 'lodash'
import Token from './recursivedescentparser/token'
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
      fixedMatchWith = matchWith.replace(`{${key}}`, _.get(rec, key))
    }
    const tokenizer = Token.getInst()
    const tokenizedMatch = tokenizer.tokenize(fixedMatchWith)
    console.log('tokenizedMatch', tokenizedMatch)
    // 5 > 3 || 5 < 2
  }
}
