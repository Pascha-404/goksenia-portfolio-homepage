if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport');
const LocalStategy = require('passport-local');
const User = require('./models/user')

const methodOverride = require('method-override');
const ExpressError = require('./utilitys/expressError');
const robots = require('express-robots-txt');
const mongoSanitize = require('express-mongo-sanitize');

const cmsRoutes = require('./routes/cmsRoutes');
const publicRoutes = require('./routes/publicRoutes')
const authenticateRoutes = require('./routes/authenticateRoutes')


// connects database with app //
mongoose.connect('mongodb://localhost/goksenia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log('Database connected!');
})

// express / routing setup //
app.set('trust proxy', 1)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(mongoSanitize());


// session cookie config
const sessionConfig = {
    secret: 'secretNeedsToBeReplaced',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));

// passport setup for login //
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setup for flash messages //
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.welcome = req.flash('welcome')
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    next();
})

// routing for robots.txt
app.use(robots({
    UserAgent: '*',
    Disallow: '/cms'
}))

// routing for login
app.use('/', authenticateRoutes)

// routing for cms
app.use('/cms', cmsRoutes);

// routing for public pages
app.use('/', publicRoutes);

// 404 route
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const {
        statusCode = 500
    } = err;

    if (!err.message) err.message = 'Something went wrong!'

    res.status(statusCode).render('error', {
        err
    })
})

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
});