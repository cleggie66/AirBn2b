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
        state: "Middle Earth",
        country: "New Zealand",
        lat: 54.234,
        lng: 132.123,
        name: "White Tower of Ecthelion",
        description: "Antique room fit for a king, minutes away from local market.",
        price: 500,
      },
      {
        ownerId: 2,
        address: "Bagshot Row",
        city: "Hobbiton",
        state: "Middle Earth",
        country: "New Zealand",
        lat: -40.234223,
        lng: -123.2342,
        name: "Bag End",
        description: "Cozy getaway deep in nature with plenty of privacy and NO VISITORS except on party business",
        price: 100,
      },
      {
        ownerId: 3,
        address: "Just outside",
        city: "Outside",
        state: "Middle Earth",
        country: "New Zealand",
        lat: -80.6224235,
        lng: 102.7234234,
        name: "Outside",
        description: "Nothing much to it, just some grass and dirt outside",
        price: 5,
      },
      {
        ownerId: 4,
        address: "Bagshot Row",
        city: "Hobbiton",
        state: "Middle Earth",
        country: "New Zealand",
        lat: 4.753,
        lng: 10.342,
        name: "Mayor's House",
        description: "Plenty of space for the whole family in this quaint house with a fantastic garden on the property",
        price: 500,
      },
      {
        ownerId: 5,
        address: "Underground",
        city: "Misty Mountains",
        state: "Middle Earth",
        country: "New Zealand",
        lat: 89.9999999,
        lng: -179.9999999,
        name: "Khazad-dûm",
        description: "Lofy apartment with plenty of space and high ceilings",
        price: 50,
      },
      {
        ownerId: 1,
        address: "3519 SW Cedar Hills Blvd",
        city: "Beaverton",
        state: "Oregon",
        country: "United States",
        lat: 89.9999999,
        lng: -179.9999999,
        name: "A McDonalds stuck in the 80s",
        description: "It's literally a McDonalds that is stuck in time in the 1980s",
        price: 149,
      },
      {
        ownerId: 1,
        address: "1923 lawson rd",
        city: "Schaumburg",
        state: "Illinois",
        country: "United States",
        lat: 89.9999999,
        lng: -179.9999999,
        name: "Robinson House",
        description: "Fabulous ranch w/spacious open floor plan is completely updated-windows, siding, roof, furnace, a/c, beautiful hardwood floors, some fresh paint, new garage door w/keyless entry. Big granite kitchen is a cook's delight with stainless steel appliances, lovely maple cabinets & roomy eating area. The family room opens to a great 4 season sun room w/terricotta floor & slider to a deck overlooking a lovely large fenced yard. King-size master bedroom w/generous closets & updated private bath. Large second bedroom w/private bath is perfect for guests!",
        price: 0,
      },
      {
        ownerId: 1,
        address: "Outer Space",
        city: "Outer Space",
        state: "Milky Way",
        country: "United States",
        lat: 89.9999999,
        lng: -179.9999999,
        name: "The Bebop",
        description: "Originally built to catch and transport fish from the seas of Ganymede, this SPACE-ious getaway is OUT OF THIS WORLD ",
        price: 50,
      },
      {
        ownerId: 1,
        address: "308 Negra Arroyo Lane",
        city: "Albuquerque",
        state: "New Mexico",
        country: "United States",
        lat: 35.1261336,
        lng: -106.5365668,
        name: "Southern getaway house with POOL!",
        description: "Me and my wife Skyler have lived here for years our son, Walter Junior lives here with us alongside our newborn baby. If you find bags of blue crystals in the crawlspace under the house, just ignore it, and if you find any money, turn it into the government.",
        price: 50,
      },
      {
        ownerId: 1,
        address: "2 Chome-1-33 Sakurajima",
        city: "Konohana Ward",
        state: "Osaka",
        country: "Japan",
        lat: 89.9999999,
        lng: -179.9999999,
        name: "Butterfly Mansion",
        description: "Rest up and heal at the butterfly mansion and spa! Our top of the line amenities will have you feeling refreshed and ready for your next adventure!",
        price: 50,
      },
      // {
      //   ownerId: 1,
      //   address: "",
      //   city: "",
      //   state: "",
      //   country: "",
      //   lat: 89.9999999,
      //   lng: -179.9999999,
      //   name: "",
      //   description: "",
      //   price: 50,
      // },
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
