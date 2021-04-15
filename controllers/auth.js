const User = require('../models/user');

module.exports.showLogin = (req, res) => {
    res.render('./cms/login')
};

module.exports.login = (req, res) => {
    const returnTo = req.session.returnTo || 'cms/index';
    req.flash('welcome', `Welcome`);
    res.redirect(returnTo)
    delete req.session.returnTo;
};

module.exports.showRegister = async (req, res) => {
    const user = await User.find({});
    if (user.length >= 2) {
        req.flash('error', 'You can not register!')
        return res.redirect('/login')
    }
    res.render('./cms/register');
};

module.exports.registerUser = async (req, res) => {
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
};

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/')
};

module.exports.showChangePassword = (req, res) => {
    res.render('./cms/changePassword')
};

module.exports.changePassword = async (req, res) => {
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
};