const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { ReviewImage, Review, User } = require('../../db/models')

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review
        }
    })

    if (!image) {
        const err = new Error();
        err.message = "Review Image couldn't be found"
        err.status = 404;
        return next(err);
    }

    if (req.user.id === image.Review.userId) {
        await image.destroy();

        res.json({
            message: 'Successfully deleted',
            statusCode: 200
        })
    } else {
        const err = new Error();
        err.message = "You must own this image to delete it"
        err.status = 403;
        return next(err);
    }
});

module.exports = router;