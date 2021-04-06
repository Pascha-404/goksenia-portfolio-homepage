const express = require('express');
const router = express.Router();

const catchAsync = require('../utilitys/catchAsync');

const User = require('../models/user');

router.get('/login', (req, res) => {
    res.render('./cms/login')
});

router.post('/login', catchAsync((req, res) => {
    res.send(req.body)
}));

module.exports = router;