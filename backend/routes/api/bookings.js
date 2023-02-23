const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Booking, Spot, SpotImage } = require('../../db/models')

router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] } }
        ]
    });

    const payload = { Bookings: [] }

    for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i].toJSON();

        const previewImage = await SpotImage.findOne({
            where: {
                spotId: booking.spotId,
                preview: true,
            }
        })

        if (previewImage) {
            booking.Spot.previewImage = previewImage.url
        } else {
            booking.Spot.previewImage = "No preview image"
        }

        payload.Bookings.push(booking)
    }
    res.json(payload)
});

module.exports = router;
