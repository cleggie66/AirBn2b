const express = require('express');
const router = express.Router();
const sequelize = require('sequelize')
const { Spot, Review, User, ReviewImage, SpotImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateNewSpot = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Description must be less than 50 characters'),
    handleValidationErrors
];


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

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot) {
        const err = new Error;
        err.status = 404;
        err.message = "spot not found";
        return next(err);
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            { model: User.scope('nameAndId') },
            { model: Spot }
        ]
    })

    const payload = { Bookings: [] }

    for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i].toJSON();

        if(booking.Spot.ownerId !== req.user.id) {
            delete booking.User;
            delete booking.id;
            delete booking.userId;
            delete booking.createdAt;
            delete booking.updatedAt;
        }
        delete booking.Spot;

        payload.Bookings.push(booking)
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

router.post('/', requireAuth, validateNewSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    // const newSpot = await Spot.create({
    //     address,
    //     city,
    //     state,
    //     country,
    //     lat,
    //     lng,
    //     name,
    //     description,
    //     price
    // })

    res.status(201).json("newSpot")
})

module.exports = router;