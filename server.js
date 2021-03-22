const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const methodOverride = require('method-override');

const catchAsync = require('./utilitys/catchAsync')

const Project = require('./models/project');
const {
    tags
} = require('./seeds/seedTags');

const mongoose = require('mongoose');

// connects database with app //
mongoose.connect('mongodb://localhost/gokseniaDB', {
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



// route for mainpage
app.get('/', async (req, res) => {
    // searches for projects with firstProject tag = true
    const firstProjects = await Project.find({
        'tags.firstProject': true,
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
        'tags.hideProject': {
            $ne: true
        }
    })

    // searches all other projects
    const projects = await Project.find({
        'tags.firstProject': {
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
        latestProjects,
        projects
    })
});

// route for single projectpage
app.get('/project/:urlName', async (req, res) => {
    const {
        urlName
    } = req.params;
    const project = await Project.findOne({
        urlName: urlName
    });
    res.render('projects', {
        project
    });

});

// route for cms index/dashboard page
app.get('/projects/index', async (req, res) => {
    const projects = await Project.find({});
    res.render('projectsIndex', {
        projects
    });
})

// route for add-page of new projects
app.get('/projects/add', (req, res) => {
    res.render('projectsAdd');
})

// route for editing existing projects
app.get('/projects/:id/edit', async (req, res) => {
    const {
        id
    } = req.params;
    const project = await Project.findById(id);
    res.render('projectsEdit', {
        project
    })
})

// update route for projects
app.put('/projects/:id', catchAsync(async (req, res) => {
    const {
        id
    } = req.params;
    const project = await Project.findByIdAndUpdate(id, {
        ...req.body
    }, {
        new: true
    });
    console.log(req.body);
    res.redirect('/projects/index');
}))

// delete route for projects
app.delete('/projects/:id', async (req, res) => {
    const {
        id
    } = req.params;
    await Project.findByIdAndDelete(id);
    res.redirect('/projects/index')
})

// route for posting new project
app.post('/projects/add', catchAsync(async (req, res) => {
    const project = new Project(req.body);
    console.log(project);
    await project.save();
    res.redirect('/projects/index');
}))

// 404 route
app.get('*', (req, res) => {
    res.send('<h1>Page not found - 404</h1>')
});

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
});