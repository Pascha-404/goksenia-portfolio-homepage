const express = require('express');
const router = express.Router();

const catchAsync = require('../utilitys/catchAsync')

const public = require('../controllers/public')

// route for mainpage
router.get('/', catchAsync(public.showHomePage));

// route for single projectpage
router.get('/project/:urlName', catchAsync(public.showProjectPage));

module.exports = router;