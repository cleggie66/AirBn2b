const express = require('express');
const router = express.Router();
const sequelize = require ('sequelize')
const { Spot, Review } = require('../../db/models');

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