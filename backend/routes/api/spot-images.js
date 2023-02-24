const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { SpotImage, Spot } = require('../../db/models')

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await SpotImage.scope('showAll').findByPk(req.params.imageId);

    if(!image) {
        const err = new Error();
        err.message = "Spot Image couldn't be found";
        err.status = 404;
        return next(err);
    }

    const spot = await Spot.findByPk(image.spotId)

    if(req.user.id !== spot.ownerId) {
        const err = new Error();
        err.message = "Forbidden";
        err.status = 403;
        return next(err);
    }

    await image.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
});

module.exports = router;