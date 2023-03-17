const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { validateLogin } = require('../../utils/custom-validators')


router.get('/', restoreUser, async (req, res) => {
    const { user } = req;

    if (user) {
        return res.json({
            user: await User.scope('noDates').findByPk(user.id)
        });
    } else return res.json({ user: null });
});

router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password});

    if (!user) {
        const err = new Error();
        err.errors = { invalid: 'The provided credentials were invalid'};
        err.status = 401;
        return next(err);
    };

    await setTokenCookie(res, user);

    return res.json({
        user: await User.scope('noDates').findByPk(user.id)
    });
});

router.delete('/', (req, res) => {
    res.clearCookie('token');
    return res.json({message: 'successfully logged out'})
});


module.exports = router;