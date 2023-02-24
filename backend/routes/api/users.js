const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateSignup } = require('../../utils/custom-validators')


router.post('/', validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const users = await User.scope('currentUser').findAll()

    for (let i = 0; i < users.length; i++) {
        const user = users[i].toJSON();
        if (user.email === email) {
            const err = new Error();
            err.message = "User already exists";
            err.status = 403;
            err.errors = { email: "User with that email already exists" }
            return next(err);
        };
        if (user.username === username) {
            const err = new Error();
            err.message = "User already exists";
            err.status = 403;
            err.errors = { username: "User with that username already exists" }
            return next(err);
        };
        
    }

    // const newUser = await User.signup({ email, password, username, firstName, lastName })

    // const token = await setTokenCookie(res, newUser);

    // const payload = newUser.toJSON();
    // delete payload.createdAt;
    // delete payload.updatedAt;
    // payload.token = token;

    return res.json(users)
});



module.exports = router;