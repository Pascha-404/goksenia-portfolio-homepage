const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const methodOverride = require('method-override');

const catchAsync = require('./utilitys/catchAsync');
const ExpressError = require('./utilitys/expressError');
const Project = require('./models/project');
const mongoose = require('mongoose');
const cmsRoutes = require('./routes/cmsRoutes');
const validateProject = require('./utilitys/validateProject')

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

app.use('/projects', cmsRoutes)

// route for mainpage
app.get('/', catchAsync(async (req, res) => {
    // searches for projects with firstProject tag = true
    const firstProjects = await Project.find({
        'tags.firstProject': true,
        'tags.hideProject': {
            $ne: true
        }
    });

    const secondProjects = await Project.find({
        'tags.secondProject': true,
        'tags.hideProject': {
            $ne: true
        }
    });

    // searches for projects with latestWork tag = true and not already in firstProjects
    const latestProjects = await Project.find({
        'tags.latestWork': true,
        'tags.firstProject': {
            $ne: true
        },
        'tags.secondProject': {
            $ne: true
        },
        'tags.hideProject': {
            $ne: true
        }
    })

    // searches all other projects
    const projects = await Project.find({
        'tags.firstProject': {
            $ne: true
        },
        'tags.secondProject': {
            $ne: true
        },
        'tags.latestWork': {
            $ne: true
        },
        'tags.hideProject': {
            $ne: true
        }
    })

    res.render('index', {
        firstProjects,
        secondProjects,
        latestProjects,
        projects
    })
}));

// route for single projectpage
app.get('/project/:urlName', catchAsync(async (req, res) => {
    const {
        urlName
    } = req.params;
    const project = await Project.findOne({
        urlName: urlName
    });
    if (!project) throw new ExpressError('Project Not Found', 404);
    res.render('projects', {
        project
    });

}));





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