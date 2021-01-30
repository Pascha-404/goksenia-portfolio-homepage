const express = require('express');
const app = express();
const port = 8080;
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('*', (req, res) => {
    res.send('<h1>Page not found - 404</h1>')
})