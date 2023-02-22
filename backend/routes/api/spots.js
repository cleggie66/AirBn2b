const express = require('express');
const router = express.Router();
const sequelize = require('sequelize')
const { Spot, Review, User, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            { model: SpotImage, where: { preview: true } }
        ]
    })

    const payload = { Spots: [] };

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i].toJSON();

        let reviewData = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                ]
            }
        })
        spot.avgRating = reviewData.toJSON().avgRating;

        let previewImage = spot.SpotImages[0].url;
        if (previewImage) {
            spot.previewImage = previewImage;
        } else {
            spot.previewImage = 'No preview image'
        };
        delete spot.SpotImages;

        payload.Spots.push(spot)
    }
    res.json(payload)
})


router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: Review, include: [User.scope('nameAndId')] },
            { model: Review, include: [ReviewImage] }
        ]
    });

    if (!spot) {
        const err = new Error();
        err.message = "Spot couldn't be found"
        err.status = 404;
        next(err);
    }
    let payload = {};
    payload.Reviews = spot.Reviews
    res.json(payload)
});

router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.scope('allDetails').findByPk(req.params.spotId, {
        include: [
            { model: SpotImage },
            { model: Review },
            { model: User.scope('nameAndId'), as: 'Owner' },
        ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating'],
                [sequelize.fn('COUNT', sequelize.col('stars')), 'numReviews']
            ],
        }
    });

    if (!spot.id) {
        const err = new Error();
        err.message = "Spot couldn't be found"
        err.status = 404;
        next(err);
    } else {
        const payload = spot.toJSON();
        delete payload.Reviews;
        res.json(payload)
    }

})

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            { model: SpotImage, where: { preview: true } },
            { model: Review }
        ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
            ]
        },
        group: ['Spot.id']
    })

    let payload = { Spots: [] };
    spots.forEach(spot => {
        const newSpot = spot.toJSON();
        newSpot.previewImage = newSpot.SpotImages[0].url;
        delete newSpot.Reviews;
        delete newSpot.SpotImages;
        payload.Spots.push(newSpot);
    });

    res.json(payload)
});

module.exports = router;