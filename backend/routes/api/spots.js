const express = require('express');
const router = express.Router();
const sequelize = require('sequelize')
const { Spot, Review, User, ReviewImage, SpotImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateNewReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .custom((value) => value <= 5 && value >= 1) 
        .withMessage('Stars must be an integer from 1 to 5'),
    check('stars')
        .isInt()
        .withMessage('Stars must be an integer from 1 to 5'),
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
});

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            { model: SpotImage },
            { model: Review }
        ]
    });

    let payload = { Spots: [] };

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i].toJSON();

        for (let i = 0; i < spot.SpotImages.length; i++) {
            const image = spot.SpotImages[i];
            if (image.preview === true) {
                spot.previewImage = image.url;
            }         
        }
        delete spot.SpotImages;

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
        delete spot.Reviews;

        payload.Spots.push(spot);
    }
    res.json(payload)
});

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate)
    const spot = await Spot.findByPk(req.params.spotId);
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    });

    if (start >= end) {
        const err = new Error();
        err.status = 400;
        err.message = "Validation Error";
        err.errors = { endDate: 'endDate cannot be on or before startDate' };
        next(err);
    }
    if(!spot) {
        const err = new Error();
        err.message = "Spot couldn't be found";
        err.status = 404;
        next(err);
    }
    if(spot.ownerId === req.user.id) {
        const err = new Error();
        err.message = "You cannot book a spot that you already own";
        err.status = 403;
        next(err);
    }
    if (bookings.length) {
        let dateError = false;
        const err = new Error();
        err.errors = {};
        for (let i = 0; i < bookings.length; i++) {
            const booking = bookings[i].toJSON();
            const existingStart = new Date (booking.startDate);
            const existingEnd = new Date(booking.endDate);
            if (start <= existingEnd && start >= existingStart) {
                err.errors.startDate = "Start date conflicts with an existing booking";
                dateError = true;
            };
            if (end <= existingEnd && end >= existingStart) {
                console.log('hi')
                err.errors.endDate = 'End date conflicts with an existing booking'
                dateError = true;
            };
        };
        if (dateError) {
            err.status = 403;
            err.message = 'Sorry, this spot is already booked for the specified dates';
            return next(err);
        };
    };

    const booking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate
    });
    const bookingCheck = await Booking.findOne({
        where: {
            spotId: req.params.spotId,
            userId: req.user.id,
            startDate,
            endDate
        }
    });

    res.json(bookingCheck);
});

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        const err = new Error();
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }

    if(req.user.id !== spot.ownerId){
        const err = new Error();
        err.message = "You do not have permission to add this image";
        err.status = 403;
        return next(err);
    }

    const image = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview
    });
    const imageCheck = await SpotImage.findOne({
        where: {
            spotId: req.params.spotId,
            url,
            preview
        }
    })
    
    res.status(200).json(imageCheck);
});

router.post('/:spotId/reviews', requireAuth, validateNewReview, async (req, res, next) => {
    const { review, stars } = req.body;
    const spot = await Spot.findByPk(req.params.spotId, {
        include: { model: Review }
    });

    if (!spot) {
        const err = new Error();
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }

    let reviewed = false
    for (let i = 0; i < spot.Reviews.length; i++) {
        const review = spot.Reviews[i].toJSON();
        if (review.userId === req.user.id) {
            reviewed = true;
        }
    }
    if (reviewed) {
        const err = new Error();
        err.message = "User already has a review for this spot";
        err.status = 403;
        return next(err);
    }

    const newReview = await Review.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        review,
        stars
    })

    res.status(201).json(newReview);
});

router.post('/', requireAuth, validateNewSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.status(201).json(newSpot)
});

router.put('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if(!spot) {
        const err = new Error();
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }
    if(req.user.id !== spot.ownerId) {
        const err = new Error();
        err.message = "You do not have permission to edit this spot";
        err.status = 403;
        return next(err);
    };
    
    await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    const spotCheck = await Spot.findByPk(req.params.spotId);

    res.json(spotCheck);
})

module.exports = router;