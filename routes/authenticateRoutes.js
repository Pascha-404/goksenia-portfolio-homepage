const express = require('express');
const router = express.Router();
const passport = require('passport')

const catchAsync = require('../utilitys/catchAsync');

const User = require('../models/user');

router.get('/login', (req, res) => {
    res.render('./cms/login')
});

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), (req, res) => {
    const returnTo = req.session.returnTo || 'cms/index'
    req.flash('welcome', `Welcome`)
    res.redirect(returnTo)
});

router.get('/register', (req, res) => {
    res.render('./cms/register')
});

router.post('/register', catchAsync(async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;
        const user = new User({
            username,
            email
        });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                return next(err)
            }
        })
        req.flash('success', 'Welcome to the CMS-Area');
        console.log(registeredUser);
        res.redirect('/cms/index');

    } catch (e) {
        if (e.code === 11000 && e.keyPattern.email === 1) {
            req.flash('error', 'E-Mail is already used');
            return res.redirect('/register');
        }
        req.flash('error', e.message);
        res.redirect('/register');
        console.log(e);
    }
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router;