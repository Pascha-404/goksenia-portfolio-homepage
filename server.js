const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const projectData = require('./projects.json')
const mongoose = require('mongoose');
const {
    kStringMaxLength
} = require('buffer');

// connects database with app //
mongoose.connect('mongodb://localhost/gokseniaDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected!')
    })
    .catch((e) => {
        console.log(e)
    });

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

app.get('*', (req, res) => {
    res.send('<h1>Page not found - 404</h1>')
});

// database schema and model

const projectSchema = new mongoose.Schema({
    urlName: {
        type: String,
        required: true,
        min: 3
    },
    title: {
        type: String,
        required: true
    },
    description: {
        homeTxt: {
            type: String,
            required: true
        },
        projectTxt: {
            type: String,
            required: true
        }

    },
    images: {
        imgLink1: {
            type: String,
            required: true
        },
        imgLink2: {
            type: String
        }
    },
    previewLink: {
        type: String
    }
})