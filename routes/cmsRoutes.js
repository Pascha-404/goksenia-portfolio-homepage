const express = require('express');
const router = express.Router();
const catchAsync = require('../utilitys/catchAsync')
const validateProject = require('../utilitys/validateProject')
const Project = require('../models/project');


// route for cms index/dashboard page
router.get('/index', catchAsync(async (req, res) => {
    const projects = await Project.find({});
    res.render('projectsIndex', {
        projects
    });
}));

// route for add-page of new projects
router.get('/add', (req, res) => {
    res.render('projectsAdd');
})

// route for editing existing projects
router.get('/:id/edit', catchAsync(async (req, res) => {
    const {
        id
    } = req.params;
    const project = await Project.findById(id);
    res.render('projectsEdit', {
        project
    })
}));

// update route for projects
router.put('/:id', validateProject, catchAsync(async (req, res) => {
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
router.delete('/:id', catchAsync(async (req, res) => {
    const {
        id
    } = req.params;
    await Project.findByIdAndDelete(id);
    res.redirect('/projects/index')
}));

// route for posting new project
router.post('/add', validateProject, catchAsync(async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.redirect('/projects/index');
}))

module.exports = router;