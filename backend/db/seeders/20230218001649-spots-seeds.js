'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "Center of the Citadel on the seventh level of Minas Tirith",
        city: "Minas Tirith",
        state: "Illinois",
        country: "Middle Earth",
        lat: 132,
        lng: 843,
        name: "White Tower of Ecthelion",
        description: "Antique room fit for a king, minutes away from local market.",
        price: 500,
      },
      {
        ownerId: 2,
        address: "Bagshot Row",
        city: "Hobbiton",
        state: "Illinois",
        country: "Middle Earth",
        lat: 396,
        lng: 215,
        name: "Bag End",
        description: "Cozy getaway deep in nature with plenty of privacy and NO VISITORS except on party business",
        price: 100,
      },
      {
        ownerId: 3,
        address: "Just outside",
        city: "Any of them",
        state: "Illinois",
        country: "Middle Earth",
        lat: 234,
        lng: 354,
        name: "Outside",
        description: "Nothing much to it, just some grass and dirt outside",
        price: 5,
      },
      {
        ownerId: 4,
        address: "Bagshot Row",
        city: "Hobbiton",
        state: "Illinois",
        country: "Middle Earth",
        lat: 243,
        lng: 186,
        name: "Mayor's House",
        description: "Plenty of space for the whole family in this quaint house with a fantastic garden on the property",
        price: 500,
      },
      {
        ownerId: 5,
        address: "Underground",
        city: "Misty Mountains",
        state: "Illinois",
        country: "Middle Earth",
        lat: 234,
        lng: 543,
        name: "Khazad-dûm",
        description: "Lofy apartment with plenty of space and high ceilings",
        price: 50,
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ['White Tower of Ecthelion', 'Bag End', 'Outside', "Mayor's House", "Khazad-dûm"]
      }
    }, {})
  }
};
