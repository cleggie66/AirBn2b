'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   options.tableName = 'Bookings';
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 3,
       startDate: '2024-01-10',
       endDate: '2024-01-15'
    },
     {
       spotId: 2,
       userId: 4,
       startDate: '2024-06-10',
       endDate: '2024-06-19'
     },
     {
       spotId: 3,
       userId: 5,
       startDate: '2024-03-03',
       endDate: '2024-03-10'
     },
     {
       spotId: 4,
       userId: 1,
       startDate: '2024-09-10',
       endDate: '2024-09-12'
     },
     {
       spotId: 5,
       userId: 2,
       startDate: '2024-04-13',
       endDate: '2024-04-18'
     },
     {
       spotId: 4,
       userId: 2,
       startDate: '2024-06-13',
       endDate: '2024-06-18'
     },
   ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3,4,5]
      }
    })
  }
};
