module.exports = {
  allowedTags: ['iframe'],
  allowedAttr: ['style', 'allow', 'allowfullscreen', 'frameborder', 'scrolling'],

  // Abyss Table Configs
  abyssTableHeaderKeys: [
    {
      title: 'Rank',
      format: '{rank}',
      keys: ['rank']
    },
    {
      title: 'Version',
      format: '{version}',
      keys: ['version'],
      filterValues: [
        { title: 'All', lookFor: '.*', selected: true },
        { title: '2.1', lookFor: '2.1' },
        { title: '2.0', lookFor: '2.0' }
      ]
    },
    {
      title: 'Floor',
      format: '{floor}',
      keys: ['floor'],
      filterValues: [
        { title: 'All', lookFor: '.*', selected: true },
        { title: '12-1-1', lookFor: '12-1-1' },
        { title: '12-1-2', lookFor: '12-1-2' },
        { title: '12-1-3', lookFor: '12-1-3' },
        { title: '12-3-1', lookFor: '12-3-1'}
      ]
    },
    {
      title: 'Time',
      format: '{time}',
      keys: ['time']
    },
    {
      title: 'Alias',
      format: '{alias}',
      keys: ['alias']
    },
    {
      title: 'Region',
      format: '{region}',
      keys: ['region']
    },
    {
      title: 'Characters',
      format: '{characters}',
      keys: ['characters']
    },
    {
      title: 'Notes',
      format: '{notes}',
      keys: ['notes']
    }
  ],
  abyssTablePagination: { 
    rows: [10, 20, 50, 100],
    selected: 20
  },
  abyssTableFilters: {
      headers: ['12-1-1', '12-1-2', '12-2-1', '12-2-2', '12-3-1', '12-3-2', '12-1', '12-2', '12-3'],
      values: ['12-1-1', '12-1-2', '12-2-1', '12-2-2', '12-3-1', '12-3-2', '12-1', '12-2', '12-3'],
      key: 'Floor',
      defaultFilter: '12-3-1'
    },
  abyssTableDataSource: '/record/entries'
};