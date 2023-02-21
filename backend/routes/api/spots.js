const express = require('express');
const router = express.Router();
const sequelize = require ('sequelize')
const { Spot, Review, User, ReviewImage } = require('../../db/models');

router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: Review, include: [User.scope('nameAndId')] },
            { model: Review, include: [ReviewImage] }
        ]
    });

    if(!spot) {
        const err = new Error();
        err.message = "Spot couldn't be found"
        err.status = 404;
        next(err);
    }

    let payload = {};
    payload.Reviews = spot.Reviews
    res.json(payload)
    
});

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: Review,
        // attributes: {
        //     include: [
        //         [
        //             sequelize.fn('AVG', sequelize.col('stars')),
        //             'avgAll'
        //         ]
        //     ]
        // }
    });

    const payload = {new: []}

    for (spot of spots) {

        let sum = 0
        spot.Reviews.forEach(review => {
            sum += review.stars
        });
        spot.avgRating = sum / spot.Reviews.length;
        payload.new.push(spot)

    }

    res.status(200).json(payload)
});

module.exports = router;