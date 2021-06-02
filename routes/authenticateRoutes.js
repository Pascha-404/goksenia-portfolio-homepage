const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchAsync = require('../utilitys/catchAsync');
const {
    isLoggedIn,
    hasPermission
} = require('../middleware')

const auth = require('../controllers/auth')

router.route('/login')
    .get(auth.showLogin)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), auth.login);

router.route('/register')
    .get(catchAsync(auth.showRegister))
    .post(catchAsync(auth.registerUser));

router.get('/logout', auth.logout)

router.get('/changePassword', isLoggedIn, hasPermission, auth.showChangePassword)

router.put('/changePassword/:user', isLoggedIn, hasPermission, catchAsync(auth.changePassword))

module.exports = router;