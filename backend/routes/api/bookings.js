const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Booking, Spot, SpotImage, User } = require('../../db/models')

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

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const booking = await Booking.findByPk(req.params.bookingId);

    if (start >= end) {
        const err = new Error();
        err.status = 400;
        err.message = "Validation Error";
        err.errors = { endDate: 'endDate cannot come before startDate' };
        next(err);
    }
    if(!booking) {
        const err = new Error();
        err.message = "Booking couldn't be found";
        err.status = 404;
        return next(err);
    };

    const bookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        }
    });
    
    if(new Date(booking.startDate) < new Date()){
        const err = new Error();
        err.message = "Past bookings can't be modified"
        err.status = 403;
        return next(err);
    }
    if(req.user.id !== booking.userId) {
        const err = new Error();
        err.message = "You do not have permission to edit this booking";
        err.status = 404;
        return next(err);
    };
    if (bookings.length) {
        let dateError = false;
        const err = new Error();
        err.errors = {};
        for (let i = 0; i < bookings.length; i++) {
            const booking = bookings[i].toJSON();
            const existingStart = new Date(booking.startDate);
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

    await booking.update({
        startDate,
        endDate
    })

    const checkBooking = await Booking.findByPk(req.params.bookingId);
    res.json(checkBooking);
});

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findOne({
        where: { id: req.params.bookingId },
        include: { model: Spot }
    })

    if(!booking) {
        const err = new Error();
        err.message = "Booking couldn't be found";
        err.status = 404;
        return next(err);
    };
    if(!(req.user.id === booking.userId || req.user.id === booking.Spot.ownerId)) {
        const err = new Error();
        err.message = "You do not have permission to delete this booking";
        err.status = 403;
        return next(err);
    };
    if(new Date(booking.startDate) < new Date()) {
        const err = new Error();
        err.message = "Bookings that have been started can't be deleted";
        err.status = 403;
        return next(err);
    };
    
    await booking.destroy();
    
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
