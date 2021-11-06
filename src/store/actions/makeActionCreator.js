export default function makeActionCreator(type, ...argKeys) {
  return function (...args) {
    const action = { type }
    argKeys.map((arg, idx) => {
      action[argKeys[idx]] = args[idx]
    })
    return action
  }
}