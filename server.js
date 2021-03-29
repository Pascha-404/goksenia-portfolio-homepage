const express = require('express');
const app = express();
const port = 8080;
const methodOverride = require('method-override');
const ExpressError = require('./utilitys/expressError');
const mongoose = require('mongoose');
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

// routing for cms
app.use('/cms', cmsRoutes);

// routing for public pages
app.use('/', publicRoutes);

// 404 route
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

// error handler
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