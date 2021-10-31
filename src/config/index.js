module.exports = {
  allowedTags: ['iframe'],
  allowedAttr: ['style', 'allow', 'allowfullscreen', 'frameborder', 'scrolling'],
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
  ]
};