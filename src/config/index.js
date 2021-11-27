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
  edittablesubtabs: {
    HEADERS: 'Headers',
    DATA_SETUP: 'Data Setup',
    FINISH_EDIT: 'Finish Edit',
  },
  tableheaderkeys: {
    TITLE: 'title',
    FORMAT: 'format',
    KEYS: 'keys',
    FILTERVALUES: 'filterValues',
    FILTERSTYLE: 'filterStyle',
  },
}
