const { validationResult } = require('express-validator');



const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        
        const errs = {}
        validationErrors.errors.forEach(error => {
            param = error.param;
            errs[param] = error.msg;
        });

        const err = Error('Validation Error');
        err.errors = errs;
        err.status = 400;
        next(err);
    }
    next();
}

module.exports = {
    handleValidationErrors
};