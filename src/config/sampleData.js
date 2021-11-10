export default class SampleDataGenerator {
  static samplePostData(empty = false) {
    if (empty) {
      return []
    }
    return [
      [
        {
          _id: 1,
          title: 'Welcome to this page',
          content:
            'Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n',
        },
      ],
      [
        {
          _id: 2,
          title: 'First',
          content: 'Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n',
        },
        {
          _id: 3,
          title: 'Second',
          content: 'Hello this is a sample post',
        },
        {
          _id: 4,
          title: 'Third',
          content: 'Hello this is a sample post',
        },
      ],
      [
        {
          _id: 5,
          title: 'Bar',
          content: 'Foo',
        },
        {
          _id: 6,
          title: 'Alphabet',
          content: 'Soup',
        },
      ],
    ]
  }
}
