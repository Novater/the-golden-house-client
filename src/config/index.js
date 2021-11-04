module.exports = {
  allowedTags: ['iframe'],
  allowedAttr: [
    'style',
    'allow',
    'allowfullscreen',
    'frameborder',
    'scrolling',
  ],

  // Abyss Table Configs
  abyssTableHeaderKeys: [
    {
      title: 'Rank',
      format: '{rank}',
      keys: ['rank'],
    },
    {
      title: 'Version',
      format: '{version}',
      keys: ['version'],
      filterValues: [
        { title: 'All', lookFor: '.*' },
        { title: '2.1', lookFor: '2.1', selected: true },
        { title: '2.0', lookFor: '2.0' },
      ],
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
        { title: '12-3-1', lookFor: '12-3-1' },
      ],
    },
    {
      title: 'Time',
      format: '{time}',
      keys: ['time'],
    },
    {
      title: 'Alias',
      format: '{alias}',
      keys: ['alias'],
    },
    {
      title: 'Region',
      format: '{region}',
      keys: ['region'],
      filterValues: [
        { title: 'America', lookFor: 'America', selected: true },
        { title: 'Asia', lookFor: 'Asia', selected: true },
        { title: 'Europe', lookFor: 'Europe' },
        { title: 'China', lookFor: 'China' },
      ],
      filterStyle: 'checkbox',
    },
    {
      title: 'Characters',
      format: '{characters}',
      keys: ['characters'],
      filterValues: [
        { title: 'Hu Tao', lookFor: '.*Hutao.*' },
        { title: 'Ganyu', lookFor: '.*Ganyu.*' },
        { title: 'Raiden', lookFor: '.*Raiden.*' },
        { title: 'Venti', lookFor: '.*Venti.*' },
        { title: 'Bennett', lookFor: '.*Bennett.*' },
        { title: 'Cryo Kazuha', lookFor: '.*Qiqi.*' },
      ],
      filterStyle: 'checkbox',
    },
    {
      title: 'Notes',
      format: '{notes}',
      keys: ['notes'],
    },
  ],
  abyssTablePagination: {
    rows: [10, 20, 50, 100],
    selected: 20,
  },
  getTableConfigs(tableName) {
    switch (tableName) {
      case 'abyss':
        return {
          rowSelectOptions: this.abyssTablePagination,
          headers: this.abyssTableHeaderKeys,
          filters: this.abyssTableFilters,
        }
      default:
        return {
          rowSelectOptions: '',
          headers: '',
          filters: '',
          dataSource: '',
        }
    }
  },
}
