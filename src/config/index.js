module.exports = {
  allowedTags: ['iframe'],
  allowedAttr: [
    'style',
    'allow',
    'allowfullscreen',
    'frameborder',
    'scrolling',
  ],
  endpoints: {
    login: '/login',
    logout: '/logout',
    loggedIn: '/logged-in',
  },
}
