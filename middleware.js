const User = require('./models/user')
const {
    projectSchema
} = require('./schemas/projectSchema');
const ExpressError = require('./utilitys/expressError');

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

module.exports.validateProject = (req, res, next) => {
    const {
        error
    } = projectSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}