const express = require('express');
const router = express.Router();
const passport = require('passport')

const catchAsync = require('../utilitys/catchAsync');
const isLoggedIn = require('../utilitys/isLoggedIn')

const User = require('../models/user');

router.get('/login', (req, res) => {
    res.render('./cms/login')
});

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), (req, res) => {
    const returnTo = req.session.returnTo || 'cms/index';
    req.flash('welcome', `Welcome`);
    res.redirect(returnTo)
    delete req.session.returnTo;
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

router.get('/changePassword', isLoggedIn, (req, res) => {
    res.render('./cms/changePassword')
})

router.put('/changePassword/:user', isLoggedIn, catchAsync(async (req, res) => {
    const {
        oldPw,
        newPw,
        validatePw
    } = req.body;
    if (newPw !== validatePw) {
        req.flash('error', '2. and 3. must be the same')
        return res.redirect('/changePassword')
    }
    User.changePassword(oldPw, newPw)
    req.flash('success', 'Changed Password');
    res.redirect('/cms/index')
}))

module.exports = router;