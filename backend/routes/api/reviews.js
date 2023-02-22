const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const sequelize = require('sequelize')
const { User, Review, Spot, ReviewImage, SpotImage } = require('../../db/models')

router.get('/current', requireAuth, async (req, res, next) => {
    const user = await User.findByPk(req.user.id)
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { model: User.scope('nameAndId') },
            { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt']} },
            { model: ReviewImage }
        ]
    })

    const payload = { Reviews: reviews }

    for (review of payload.Reviews) {
        const img = await SpotImage.findOne({
            where: {
                spotId: review.Spot.id
            }
        })
        review.Spot.dataValues.previewImage = img.url
    }

    res.json(payload)

})

module.exports = router;