const express = require('express');
const router = express.Router();
const passport = require('passport')

const catchAsync = require('../utilitys/catchAsync');
const {
    isLoggedIn,
    hasPermission
} = require('../middleware')

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

router.get('/register', catchAsync(async (req, res) => {
    const user = await User.find({});
    if (user.length >= 2) {
        req.flash('error', 'You can not register!')
        return res.redirect('/login')
    }
    res.render('./cms/register');
}));

router.post('/register', catchAsync(async (req, res) => {
    const user = await User.find({});
    if (user.length >= 2) {
        req.flash('error', 'You can not register!')
        return res.redirect('/login')
    }
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

router.get('/changePassword', isLoggedIn, hasPermission, (req, res) => {
    res.render('./cms/changePassword')
})

router.put('/changePassword/:user', isLoggedIn, hasPermission, catchAsync(async (req, res) => {
    const {
        oldPw,
        newPw,
        validatePw
    } = req.body;
    const userId = req.user._id;
    if (newPw !== validatePw) {
        req.flash('error', '2. and 3. must be the same')
        return res.redirect('/changePassword')
    }
    await User.findById(userId)
        .then(user => {
            user.changePassword(oldPw, newPw)
                .then(() => {
                    req.flash('success', 'Changed Password!');
                    res.redirect('/cms/index');
                })
                .catch((e) => {
                    req.flash('error', e.message);
                    console.log(e);
                    res.redirect('/changePassword');
                })
        })
        .catch((e) => {
            req.flash('error', e.message);
            console.log(e);
            res.redirect('/changePassword');
        })
}))

module.exports = router;