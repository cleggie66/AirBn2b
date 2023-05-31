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
        url: "https://i.pinimg.com/originals/24/7c/b0/247cb0fdd8eef447d7ec5273eff5133c.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://vwartclub.com/media/projects/5262/1.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://1.bp.blogspot.com/-5zK5wbWu11A/XYXIVn0GnXI/AAAAAAAAxqE/coWJUZmshK0hcikMU0Ts7Qoci-exranhACEwYBhgL/s1600/%2528ROTK%2529%2BEowyn%2Band%2BFarmir%2B%25283%2529.jpg",
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
        url: "https://i0.wp.com/www.hellokelinda.com/wp-content/uploads/2020/04/bag-end-sitting-room.jpg?w=800&ssl=1",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i0.wp.com/www.hellokelinda.com/wp-content/uploads/2020/04/bag-end-view.jpg?w=800&ssl=1",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.pinimg.com/originals/d1/c3/88/d1c388e555c0b29cb61ac56d98fffe0f.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.unsplash.com/photo-1564314016469-d0e1851b24a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWlkZGxlJTIwZWFydGh8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
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
      {
        spotId: 6,
        url: "https://hookedonhouses.net/wp-content/uploads/2016/04/Cheaper-by-the-Dozen-movie-house-moving-in-1.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://hookedonhouses.net/wp-content/uploads/2022/01/turret-on-Cheaper-by-the-Dozen-house.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hookedonhouses.net/wp-content/uploads/2022/01/entry-hall-Cheaper-by-the-Dozen-house.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hookedonhouses.net/wp-content/uploads/2022/01/Bonnie-Hunt-Steve-Martin-Cheaper-by-the-Dozen-entry.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hookedonhouses.net/wp-content/uploads/2022/01/Steve-Martin-in-Cheaper-by-the-Dozen-kitchen.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://hookedonhouses.net/wp-content/uploads/2014/09/Gump-Boarding-House.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://th-thumbnailer.cdn-si-edu.com/zqdLT12TFMSXUTW4fPeG8uxDyrA=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/a8/51/a851be96-2508-422f-88fa-5aee6fc7ada3/stand_in_cover_pic.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://hookedonhouses.net/wp-content/uploads/2020/02/Forrest-Gump-House-Tom-Hanks-Front-Porch.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://www.thestate.com/news/local/h10eov/picture160428964/alternates/FREE_1140/Tidalholm",
        preview: false
      },
      {
        spotId: 7,
        url: "https://houseandhistory.com/wp-content/uploads/2019/07/Inside-Forrest-Gump-House.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i0.wp.com/housecrazysarah.life/wp-content/uploads/2021/01/Groundhog-Day-Movie-Bed-and-Breakfast-1.jpg?fit=800%2C491&ssl=1",
        preview: true
      },
      {
        spotId: 8,
        url: "https://hookedonhouses.net/wp-content/uploads/2014/01/Groundhog-Day-Movie-stills-40.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://cherrytreeinnbnb.com/wp-content/uploads/2021/08/The-Magnolia-Suite-Bedroom.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i0.wp.com/housecrazysarah.life/wp-content/uploads/2021/01/Groundhog-Day-Movie-stills-36.jpg?resize=736%2C428&ssl=1",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.dailymail.co.uk/1s/2021/02/11/19/39176298-9250797-Cherry_Tree_Inn_has_four_ensuite_guest_rooms_on_the_second_floor-a-52_1613071035187.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://hips.hearstapps.com/hbu.h-cdn.co/assets/16/34/768x384/landscape-1471902268-movie-homes-home-alone.jpg?resize=1200:*",
        preview: true
      },
      {
        spotId: 9,
        url: "https://www.theadvertiser.com/gcdn/-mm-/6d46f0a03148c87ce3989a311abc6d55d0153ee9/c=0-302-3264-2146/local/-/media/2015/11/17/LAGroup/LafayetteLA/635833823197834471-home1.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://hookedonhouses.net/wp-content/uploads/2009/11/Home-Alone-movie-house-entry-hall-staircase.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://hookedonhouses.net/wp-content/uploads/2011/05/Home-Alone-house-red-and-green-kitchen.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i2-prod.mirror.co.uk/incoming/article4867291.ece/ALTERNATES/s615b/Home-Alone-movie-house-kitchen-back-staircase.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://images.wideopencountry.com/wp-content/uploads/2023/01/the-notebook-house.png",
        preview: true
      },
      {
        spotId: 10,
        url: "https://hookedonhouses.net/wp-content/uploads/2019/01/Inside-Noahs-house-The-Notebook.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://hookedonhouses.net/wp-content/uploads/2019/01/Noah-and-Allie-in-the-Dining-Room-Notebook.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://hookedonhouses.net/wp-content/uploads/2014/06/Black-River-Plantation-as-nursing-home-in-The-Notebook.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://hookedonhouses.net/wp-content/uploads/2014/06/The-Notebook-movie-house-art-studio.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://imageio.forbes.com/blogs-images/keithflamer/files/2019/06/Screen-Shot-2019-06-03-at-3.05.58-PM-1200x799.jpg?height=473&width=711&fit=bounds",
        preview: true
      },
      {
        spotId: 11,
        url: "https://imageio.forbes.com/blogs-images/keithflamer/files/2019/06/Screen-Shot-2019-06-03-at-3.06.44-PM-1200x670.png?format=png&width=1200",
        preview: false
      },
      {
        spotId: 11,
        url: "https://www.highsnobiety.com/static-assets/thumbor/kgn6VOSxgHsRr1mWsT2s6wce-YE=/1600x1067/www.highsnobiety.com/static-assets/wp-content/uploads/2019/06/03143126/sopranos-house-sale-01.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://i.pinimg.com/originals/b9/91/de/b991de5b1cd2ca10767383584106cb90.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://media.bizj.us/view/img/11336055/nj-sopranos-house-1-0*750xx3600-2025-0-188.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://hips.hearstapps.com/hmg-prod/images/bb5-1556809406.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://static.onecms.io/wp-content/uploads/sites/6/2017/10/pizza-on-roof-breaking-bad-2000.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://static.wixstatic.com/media/851bfc_db6bb2c34f4b43a7a117f6f69051f346~mv2.jpg/v1/fill/w_640,h_356,al_c,lg_1,q_80,enc_auto/851bfc_db6bb2c34f4b43a7a117f6f69051f346~mv2.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://i.pinimg.com/originals/e2/9d/1d/e29d1d0d1d426c00bfef9b147c686b1c.png",
        preview: false
      },
      {
        spotId: 12,
        url: "https://laughingsquid.com/wp-content/uploads/2019/05/Why-Breaking-Bad-is-Full-of-Swimming-Pools.png",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a.cdn-hotels.com/gdcs/production90/d247/15fbc90d-0b55-4736-9f82-1987cd0bcd7f.jpg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/00/Peter_Parker%27s_Apartment.png/revision/latest?cb=20220312195501",
        preview: false
      },
      {
        spotId: 13,
        url: "https://static.wikia.nocookie.net/marvelmovies/images/e/e0/Peter_Parker%27s_Apartment_SNWH.png/revision/latest?cb=20220602185011",
        preview: false
      },
      {
        spotId: 13,
        url: "http://onthesetofnewyork.com/homeonscreen/spiderman2_08.jpg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://donttellharrycom.files.wordpress.com/2021/02/mr-ditkovitch-spider-man-3.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://i.pinimg.com/originals/90/c1/a1/90c1a141259a2c54406a0465d68c36a0.png",
        preview: true
      },
      {
        spotId: 14,
        url: "https://www.home-designing.com/wp-content/uploads/2010/05/ironman_living_room.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://decoroutdoor.com/blog/wp-content/uploads/2021/06/futuristic-interactive-home-tony-stark.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://i.pinimg.com/originals/a6/bb/17/a6bb170c6abb47c4166ac3610ad3a6cf.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://cdna.artstation.com/p/assets/images/images/025/148/908/large/damien-stadden-starkgarage-promo02.jpg?1584805440",
        preview: false
      },
      {
        spotId: 15,
        url: "https://media.cnn.com/api/v1/images/stellar/prod/151120151436-luke-skywalkers-igloo.jpg?q=w_1600,h_900,x_0,y_0,c_fill/w_1280",
        preview: true
      },
      {
        spotId: 15,
        url: "https://lumiere-a.akamaihd.net/v1/images/databank_larsmoisturefarm_01_169_ac15d1cd.jpeg?region=0%2C81%2C1560%2C781",
        preview: false
      },
      {
        spotId: 15,
        url: "https://pbs.twimg.com/media/DsXeQiCXoAASjcs.jpg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://images.squarespace-cdn.com/content/v1/5196dd82e4b0ef02d1bb4fef/1426626479199-AA2I3GDT21GBJHB0P0W7/star-wars-attack-of-the-clones-lars-homestead-01.jpg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://i1.sndcdn.com/artworks-000139608624-wfbip4-t500x500.jpg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/b/bf/Kings_Landing.jpg",
        preview: true
      },
      {
        spotId: 16,
        url: "https://i.pinimg.com/originals/00/85/83/0085838c390176e486ccfd7521ca2d0f.png",
        preview: false
      },
      {
        spotId: 16,
        url: "https://64.media.tumblr.com/43cf719ee651e01e49b0ed145eb0da2e/tumblr_nar3uhgRbW1qldetwo1_1280.jpg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://media.cntraveler.com/photos/571848d845342aa9548fb797/16:9/w_2560%2Cc_limit/game-of-thrones-red-keep-cr-hbo.jpg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://dubrovnik-tours.com/wp-content/uploads/2020/03/Games-of-trones-019.jpg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://www.hollywoodreporter.com/wp-content/uploads/2016/09/winterfell.jpg?w=1296",
        preview: true
      },
      {
        spotId: 17,
        url: "https://i.pinimg.com/564x/60/62/6e/60626e76ffb671770d79e777607e6514.jpg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://static.dezeen.com/uploads/2019/04/game-of-thrones-deborah-riley-production-design_dezeen_2364_col_10-1.jpg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://watchersonthewall.com/wp-content/uploads/2014/09/WInterfell1.jpg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://64.media.tumblr.com/tumblr_lmcpz57YpC1qis07wo1_500.jpg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://api.time.com/wp-content/uploads/2017/07/game-of-thrones-set-meereen.jpg",
        preview: true
      },
      {
        spotId: 18,
        url: "https://i.pinimg.com/originals/3d/83/77/3d837756f119591c24dce592c901a0d8.jpg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://i.pinimg.com/originals/99/e0/33/99e033da25db79791638803e3a0dc9ab.jpg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://media.architecturaldigest.com/photos/5ce311585f30b2558e897640/master/w_1600%2Cc_limit/760001_GOT405_100913_HS_DSC6423%255B1%255D.jpg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://franklloydwright.org/wp-content/uploads/2019/05/Game-of-Thrones_Helen-SloanHBO3.jpg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://i2-prod.liverpoolecho.co.uk/incoming/article23943440.ece/ALTERNATES/s615/2_webmedia-1.jpg",
        preview: true
      },
      {
        spotId: 19,
        url: "https://blog.grandrapidschair.com/hs-fs/hubfs/McDs_5.jpg?width=1937&name=McDs_5.jpg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://www.snopes.com/uploads/2021/01/beaverton-mcdonalds-2.jpg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://www.snopes.com/uploads/2021/01/curved-glass-mcdonalds.jpg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://i.ytimg.com/vi/cyojFOr-FUI/maxresdefault.jpg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://media.newyorker.com/photos/607996e38da753362d3d25d8/4:3/w_2364,h_1773,c_limit/Xiao-LiminalSpaces.jpg",
        preview: true
      },
      {
        spotId: 20,
        url: "https://i.pinimg.com/originals/d3/12/56/d312569db31da6942c5f18417ed7f729.jpg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://preview.redd.it/zmmvywhly2e51.jpg?auto=webp&s=93c3a9c5319d1fedf19f2950b9da1cb733499a21",
        preview: false
      },
      {
        spotId: 20,
        url: "https://i.pinimg.com/550x/df/ce/d8/dfced86c1c8e241b4f6a13cc1f3627ae.jpg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://gnpsvillager.org/wp-content/uploads/2022/04/DD5C48B2-38AB-4A6F-BCB4-DFA4ECADC545-475x356.jpeg",
        preview: false
      }
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
