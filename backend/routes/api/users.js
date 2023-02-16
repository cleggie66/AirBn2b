const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


router.post('/', async (req, res) => {
    const { email, password, username } = req.body;
    const newUser = await User.signup({ email, password, username })

    await setTokenCookie(res, newUser);

    return res.json({ user: newUser })
})




module.exports = router;