const User = require('./models/user')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Sign in first!');
        return res.redirect('/login');
    }
    next();
};

module.exports.hasPermission = async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (user.isAdmin === 1) {
        next();
    } else {
        req.flash('error', 'You have no permission to do that');
        res.redirect('/cms/index')
    }
};