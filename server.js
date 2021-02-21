const express = require('express');
const app = express();
const port = 80;
const path = require('path')
const projectData = require('./projects.json')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/project/:id', (req, res) => {
    const {
        id
    } = req.params;
    const project = projectData.find(d => d.id === id);
    res.render('projects', {
        project
    })

})

app.get('*', (req, res) => {
    res.send('<h1>Page not found - 404</h1>')
})