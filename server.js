const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const projectData = require('./projects.json')
const db = require('./database')


// express / routing setup //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

app.get('/projects/index', (req, res) => {
    res.render('projectsIndex');
})

app.get('*', (req, res) => {
    res.send('<h1>Page not found - 404</h1>')
});