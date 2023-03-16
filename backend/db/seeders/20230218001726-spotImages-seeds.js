'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'SpotImages'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://static.wikia.nocookie.net/lotr/images/2/24/Ecthelion.jpg/revision/latest/scale-to-width-down/699?cb=20190513160047",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.edwud.com/wp-content/uploads/2020/07/bag-end-hobbiton.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://hikingbeast.com/content/images/2021/03/bran_transylvania_lord-of-the-rings_20190511_102505_2.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://preview.redd.it/53tly0u4ytzy.jpg?auto=webp&s=9bda24094ab19d61b62b1559f68440c6f6d493c7",
        preview: true
      },
      {
        spotId: 5,
        url: "https://r2.mt.ru/r23/photo2E21/20831474630-0/png/bp.webp",
        preview: true
      },
      {
        spotId: 6,
        url: "https://raw.githubusercontent.com/cleggie66/AA-AirBnb/main/frontend/src/media/images/80s-McDonalds/2022-04-24.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://github.com/cleggie66/AA-AirBnb/blob/main/frontend/src/media/images/bebop/E7v6q9nXoAMMFJI.jpg?raw=true",
        preview: true
      },
      {
        spotId: 9,
        url: "https://github.com/cleggie66/AA-AirBnb/blob/main/frontend/src/media/images/breaking-bad/bb5-1556809406.jpg?raw=true",
        preview: true
      },
      {
        spotId: 10,
        url: "https://raw.githubusercontent.com/cleggie66/AA-AirBnb/main/frontend/src/media/images/butterfly-mansion/mansion.png",
        preview: true
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'SpotImages'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: ['https://static.wikia.nocookie.net/lotr/images/2/24/Ecthelion.jpg/revision/latest/scale-to-width-down/699?cb=20190513160047',
          'https://www.edwud.com/wp-content/uploads/2020/07/bag-end-hobbiton.jpg',
          'https://hikingbeast.com/content/images/2021/03/bran_transylvania_lord-of-the-rings_20190511_102505_2.jpg',
          'https://preview.redd.it/53tly0u4ytzy.jpg?auto=webp&s=9bda24094ab19d61b62b1559f68440c6f6d493c7',
          'https://r2.mt.ru/r23/photo2E21/20831474630-0/png/bp.webp'
        ]
      }
    }, {})
  }
};
