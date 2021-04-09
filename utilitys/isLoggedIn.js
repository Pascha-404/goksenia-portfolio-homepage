const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Sign in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports = isLoggedIn;