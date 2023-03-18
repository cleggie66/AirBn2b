const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

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
        .custom((value) => value <= 90 && value >= -90)
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .custom((value) => value <= 180 && value >= -180)
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('description')
        .custom((value) => value.length >= 30)
        .withMessage('Description needs 30 or more characters'),
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

const validateQuery = [
    check('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Size must be greater than or equal to 1'),
    check('minLat')
        .optional()
        .custom((value) => value <= 90 && value >= -90)
        .isDecimal()
        .withMessage('Minimum latitude is invalid'),
    check('maxLat')
        .optional()
        .custom((value) => value <= 90 && value >= -90)
        .isDecimal()
        .withMessage('Maximum latitude is invalid'),
    check('minLng')
        .optional()
        .custom((value) => value <= 180 && value >= -180)
        .isDecimal()
        .withMessage('Minimum longitude is invalid'),
    check('maxLng')
        .optional()
        .custom((value) => value <= 180 && value >= -180)
        .isDecimal()
        .withMessage('Maximum longitude is invalid'),
    check('minPrice')
        .optional()
        .custom((value) => value >= 0)
        .isDecimal()
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .custom((value) => value >= 0)
        .isDecimal()
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
];

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Username is required'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required'),
    check('password')
        .custom((value) => value.length >= 6)
        .withMessage('Password must be 6 characters or more'),
    handleValidationErrors
];


module.exports = {
    validateNewSpot,
    validateNewReview,
    validateQuery,
    validateLogin,
    validateSignup
}