'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   options.tableName = 'Reviews';
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 5,
      review: 'Fantastic view. Great neighbors! Dinner was delicious, the tomoatoes were to die for',
      stars: 5
    },
     {
       spotId: 2,
       userId: 4,
       review: 'Lovely little home. This quaint quiet getaway was just what the doctor ordered',
       stars: 4
     },
     {
       spotId: 3,
       userId: 1,
       review: 'I mean it is exactly what is advertized, nothing to really complain about...',
       stars: 3
     },
     {
       spotId: 4,
       userId: 3,
       review: 'We had an amazing stay here! Owner was incredibly accommodating and the potatoes from the garden were delicious boiled, mashed, or even in a stew!',
       stars: 5
     },
     {
       spotId: 5,
       userId: 2,
       review: 'Awful, just awful. The place smelled horrible and the owner tried to hunt me down with a firey whip when i just wanted to sleep.',
       stars: 0
     }
   ], {})
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3,4,5]
      }
    }, {})
  }
};
