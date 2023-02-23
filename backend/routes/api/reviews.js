const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const sequelize = require('sequelize')
const { User, Review, Spot, ReviewImage, SpotImage } = require('../../db/models')
const { validateNewReview } = require('../../utils/custom-validators');

router.get('/current', requireAuth, async (req, res, next) => {
    const user = await User.findByPk(req.user.id)
    const reviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [
            { model: User.scope('nameAndId') },
            { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt']} },
            { model: ReviewImage }
        ]
    }) 

    const payload = { Reviews: reviews }

    for (review of payload.Reviews) {
        const img = await SpotImage.findOne({
            where: { spotId: review.Spot.id }
        })
        review.Spot.dataValues.previewImage = img.url
    }
    res.json(payload)
});

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { url } = req.body;
    const review = await Review.findByPk(req.params.reviewId);
    const images = await ReviewImage.findOne({
        where: { reviewId: review.id },
        attributes: {
            include: [[ sequelize.fn("COUNT", sequelize.col("url")), "totalImages"]]
        }
    });
    
    if(!review) {
        const err = new Error();
        err.message = "Review couldn't be found";
        err.status = 404;
        return next(err);
    };
    if(review.userId !== req.user.id) {
        const err = new Error();
        err.message = "You do not have permission to add this image";
        err.status = 403;
        return next(err);
    };
    if (images.toJSON().totalImages >= 10) {
        const err = new Error();
        err.message = "Maximum number of images for this resource was reached";
        err.status = 403;
        return next(err);
    };

    const image = await ReviewImage.create({
        reviewId: review.id,
        url,
    });
    const imageCheck = await ReviewImage.findOne({
        where: {
            reviewId: review.id,
            url
        }
    })
    res.json(imageCheck)
})

router.put('/:reviewId', requireAuth, validateNewReview, async (req, res, next) => {
    const { stars, review } = req.body;
    const currReview = await Review.findByPk(req.params.reviewId);

    if(!currReview) {
        const err = new Error();
        err.message = "Review couldn't be found";
        err.status = 404;
        return next(err);
    };
    if(req.user.id !== currReview.userId) {
        const err = new Error();
        err.message = "You do not have permission to edit this review";
        err.status = 403;
        return next(err);
    };

    await currReview.update({
        stars,
        review
    });

    const reviewCheck = await Review.findByPk(req.params.reviewId);

    res.json(reviewCheck);
});

module.exports = router;