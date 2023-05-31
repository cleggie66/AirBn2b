'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: '01-10-2024',
        endDate: '01-15-2024'
      },
      {
        spotId: 2,
        userId: 4,
        startDate: '06-10-2024',
        endDate: '06-19-2024'
      },
      {
        spotId: 3,
        userId: 5,
        startDate: '03-03-2024',
        endDate: '03-10-2024'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '09-10-2024',
        endDate: '09-12-2024'
      },
      {
        spotId: 5,
        userId: 2,
        startDate: '04-13-2024',
        endDate: '04-18-2024'
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '06-13-2024',
        endDate: '06-18-2024'
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3, 4, 5]
      }
    }, {})
  }
};
