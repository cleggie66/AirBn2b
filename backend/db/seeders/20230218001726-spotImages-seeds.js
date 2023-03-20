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
        url: "https://i.etsystatic.com/17727358/r/il/b7178a/3462596045/il_fullxfull.3462596045_3eyu.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://www.councilofelrond.com/wp-content/uploads/2012/10/coeminastirith02.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://lh3.googleusercontent.com/LhpoONqsv3qgYKQyN_PdOqTKBZ7v2XymeYe2Gu0ztUVrYVrP2xDIThCD1eJh6SmiZ0kdvPywC9KJdPzNkOI0xcG1fwK67ffsqAj09II",
        preview: false
      },
      {
        spotId: 1,
        url: "https://lh3.googleusercontent.com/GdxQ3B3A8p8BpoF6WIFO-qwP2n80kY8ZGjqHPfxRTI19MufvP662SwsRPt_mhtyHqsVgj3ILSbUZ-WPqTar27mq4nNYQrUi_46LS82qF",
        preview: false
      },
      {
        spotId: 1,
        url: "https://lh3.googleusercontent.com/E9IgRfXnQ4myoITBx_PaCSAxxcPQ3_i64mLDBMZSEkuxG8f1RYDK0-QdtVjEOMptW4r5AjQNxrFNg95dIdDDiZSUuDXMS7-BaDASEl6F-TW_",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.edwud.com/wp-content/uploads/2020/07/bag-end-hobbiton.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://news.airbnb.com/wp-content/uploads/sites/4/2022/12/01-Hobbiton-Airbnb-The-Shire-Credit-Larnie-Nicolson.jpg?fit=3000%2C2000",
        preview: false
      },
      {
        spotId: 2,
        url: "https://lh3.googleusercontent.com/utl2mT2_gpTaa4xTZqs9hcot2CGgGLuv1G6fOoScFOflf7t5glg3QQ9ZuVAMcf4oKWCmisizYiQZhMmCcKyrwDtDNAMSAo1koX_l6W9qdnI",
        preview: false
      },
      {
        spotId: 2,
        url: "https://static.wikia.nocookie.net/lotr/images/e/e4/Vlcsnap-2013-05-19-19h49m07s0.png/revision/latest/scale-to-width-down/1000?cb=20130519155935",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.pinimg.com/originals/d1/c3/88/d1c388e555c0b29cb61ac56d98fffe0f.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://hikingbeast.com/content/images/2021/03/bran_transylvania_lord-of-the-rings_20190511_102505_2.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://images.squarespace-cdn.com/content/v1/5bb1b6cdf4755a7725f60a37/1597814847239-1YSV0KP9SX4EDOMSJHYA/Hobbiton_2256.jpeg?format=1000w",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.squarespace-cdn.com/content/v1/5bb1b6cdf4755a7725f60a37/1597815125517-NSKN5JX0JQYDDY5ITS92/Hobbiton_hobbit+holes.jpeg?format=1000w",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.squarespace-cdn.com/content/v1/5bb1b6cdf4755a7725f60a37/1597815979158-4H2M52CPNMOA6GNKLNV3/Hobbiton_Green_Dragon.jpeg?format=1000w",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.kinja-img.com/gawker-media/image/upload/c_fit,f_auto,g_center,q_60,w_965/01ab2a0c6e3a2797b422a0a8c54384f3.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://preview.redd.it/53tly0u4ytzy.jpg?auto=webp&s=9bda24094ab19d61b62b1559f68440c6f6d493c7",
        preview: true
      },
      {
        spotId: 4,
        url: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/home-of-samwise-gamgee-aaron-choi.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.pinimg.com/originals/a5/3e/69/a53e6915b2e7437544e2309c78299031.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://filmgrab.files.wordpress.com/2014/08/6543.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.thechildrensbookreview.com/wp-content/uploads/2021/08/The-Hobbit-by-J.R.R.-Tolkien-Book-Review.png",
        preview: false
      },
      {
        spotId: 5,
        url: "https://pbs.twimg.com/media/Eps57KpXUAM04Rp.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://duet-cdn.vox-cdn.com/thumbor/0x0:1200x804/640x427/filters:focal(690x351:691x352):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/7691895/lord_of_the_rings_the_fellowship_of_the_ring_1.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://static.wikia.nocookie.net/lotr/images/6/61/Durin%27s_grave.jpg/revision/latest/scale-to-width-down/1000?cb=20100116152218",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.pinimg.com/564x/80/30/b1/8030b12a57ee27954d009bd9dc00cb0b.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://qph.cf2.quoracdn.net/main-qimg-cedad5cb7aab63598f5ef7b5959ead2a-lq",
        preview: false
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
