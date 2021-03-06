export default class serverFunctions {
  static getServerURL() {
    // return process.env.REACT_APP_PRODUCTION_SERVER_URL

    if (process.env.REACT_APP_NODE_ENV === 'production') {
      return process.env.REACT_APP_PRODUCTION_SERVER_URL
    }

    return process.env.REACT_APP_DEVELOPMENT_SERVER_URL
  }
}
