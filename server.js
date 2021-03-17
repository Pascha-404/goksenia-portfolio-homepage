const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const methodOverride = require('method-override');

const projectData = require('./projects.json');

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

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
});

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/project/:id', (req, res) => {
    const {
        id
    } = req.params;
    const project = projectData.find(d => d.id === id);
    res.render('projects', {
        project
    })

});

app.get('/projects/index', async (req, res) => {
    const projects = await Project.find({});
    res.render('projectsIndex', {
        projects
    });
})

app.get('/projects/add', (req, res) => {
    res.render('projectsAdd');
})

app.get('/projects/:id/edit', async (req, res) => {
    const {
        id
    } = req.params;
    const project = await Project.findById(id);
    res.render('projectsEdit', {
        project
    })
})

app.put('/projects/:id', async (req, res) => {
    const body = await req.body;
    console.log(body)
    res.send('Routing worked');
})

app.delete('/projects/:id', async (req, res) => {
    const {
        id
    } = req.params;
    await Project.findByIdAndDelete(id);
    res.redirect('/projects/index')
})

app.post('/projects/add', (req, res) => {
    const newProject = req.body;
    console.log(newProject)
    res.redirect('/projects/add')
})

app.get('*', (req, res) => {
    res.send('<h1>Page not found - 404</h1>')
});