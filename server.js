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

const MongoStore = require('connect-mongo');

const methodOverride = require('method-override');
const ExpressError = require('./utilitys/expressError');
const robots = require('express-robots-txt');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')

const cmsRoutes = require('./routes/cmsRoutes');
const publicRoutes = require('./routes/publicRoutes')
const authenticateRoutes = require('./routes/authenticateRoutes')

const MONGO_USERNAME = process.env.DB_GOKSENIA_USER;
const MONGO_PASSWORD = process.env.DB_GOKSENIA_PW;
const MONGO_HOSTNAME = 'localhost';
const MONGO_PORT = '27017';
const MONGO_DB = 'goksenia';
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=goksenia` || 'mongodb://localhost/goksenia'
const secret = process.env.SECRET;

// connects database with app //
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
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

// security helpers //
app.use(mongoSanitize());

app.use(helmet({
    contentSecurityPolicy: false
}));

const connectSrcUrls = [
    "https://www.google-analytics.com/",
]
const scriptSrcUrls = [
    "https://cdn.jsdelivr.net/",
    "https://www.googletagmanager.com/",
    "http://www.googletagmanager.com/",
    "https://www.google-analytics.com/analytics.js",
]
const styleSrcUrls = [
    "https://cdn.jsdelivr.net/",
    "https://fonts.googleapis.com/",
]
const fontSrcUrls = [
    "https://fonts.gstatic.com/",
]

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'self'", "'unsafe-inline'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/drpmdiapv/",
                "https://www.google-analytics.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls]
        },
    })
);

// session cookie config
const store = MongoStore.create({
    mongoUrl: url || "mongodb://localhost/goksenia",
    crypto: {
        secret
    },
    touchAfter: 24 * 60 * 60
});

store.on('error', function (e) {
    console.log('Session Store Error!', e)
})

const sessionConfig = {
    store,
    name: 'goksenia_session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
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