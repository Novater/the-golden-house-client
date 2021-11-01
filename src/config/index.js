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
      keys: ['version']
    },
    {
      title: 'Floor',
      format: '{floor}',
      keys: ['floor']
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
    key: 'Floor'
  },
  abyssTableDataSource: 'entries'
};