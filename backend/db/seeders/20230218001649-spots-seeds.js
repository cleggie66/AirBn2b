'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      // {
      //   ownerId: 1,
      //   address: "Test",
      //   city: "Test",
      //   country: "Test",
      //   lat: 132,
      //   lng: 843,
      //   name: "Test",
      //   description: "Test",
      //   price: 500,
      // },
      {
        ownerId: 1,
        address: "Center of the Citadel on the seventh level of Minas Tirith",
        city: "Minas Tirith",
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ['White Tower of Ecthelion', 'Bag End', 'Outside', "Mayor's House", "Khazad-dûm"]
      }
    }, {})
  }
};
