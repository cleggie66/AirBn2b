'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Aragorn',
        lastName: 'Elessar',
        email: 'aragorn@lotr.io',
        username: 'king_returned_33',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Frodo',
        lastName: 'Baggins',
        email: 'frodo@lotr.io',
        username: 'ring-bearer',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Gandalf',
        lastName: 'Greyhame',
        email: 'gandalf@lotr.io',
        username: 'servantOfTheSecretFIRE',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Samwise',
        lastName: 'Gamgee',
        email: 'sam@lotr.io',
        username: 's@mwi$e_the_br@ve',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: "Durin's",
        lastName: 'Bane',
        email: 'balrog@lotr.io',
        username: 'balrog_of_morgoth',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: "demo",
        lastName: 'user',
        email: 'demo@user.org',
        username: 'demo-user',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['king_returned_33', 'ring-bearer', 'servantOfTheSecretFIRE', 's@mwi$e_the_br@ve', 'balrog_of_morgoth'] }
    }, {});
  }
};
