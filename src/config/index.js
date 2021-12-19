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
  filterTypes: {
    EXACT: 'Exact',
    ROUGH: 'Rough',
    FORMULA: 'Formula',
  },
  placeHolders: {
    PAGINATION: JSON.stringify(
      {
        rows: ['15', '30', '50', '100'],
        selected: '30',
      },
      null,
      2,
    ),
    DATA_URL: `https://yourendpoint`,
    SEARCHABLE: `true or false`,
    FORMAT: `My ColumnValue: {KeyFromDataStructure}`,
    TITLE: `My Column Title`,
    FILTERSTYLE: `dropdown or checkbox`,
    REFRESH_RATE: `Time in milliseconds`,
  },
  filterStyles: ['dropdown', 'checkbox'],
}
