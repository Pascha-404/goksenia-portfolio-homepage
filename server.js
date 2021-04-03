const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash')

const methodOverride = require('method-override');
const ExpressError = require('./utilitys/expressError');
const robots = require('express-robots-txt');

const cmsRoutes = require('./routes/cmsRoutes');
const publicRoutes = require('./routes/publicRoutes')


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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

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

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    next();
})

// routing for robots.txt
app.use(robots({
    UserAgent: '*',
    Disallow: '/cms'
}))

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