const express = require('express');
const router = express.Router();

const catchAsync = require('../utilitys/catchAsync')
const validateProject = require('../utilitys/validateProject')

const Project = require('../models/project');


// route for cms index/dashboard page
router.get('/index', catchAsync(async (req, res) => {
    const projects = await Project.find({});
    res.render('./cms/projectsIndex', {
        projects
    });
}));

// route for add-page of new projects
router.get('/add', (req, res) => {
    res.render('./cms/projectsAdd');
})

// route for editing existing projects
router.get('/:id/edit', catchAsync(async (req, res) => {
    const {
        id
    } = req.params;
    const project = await Project.findById(id);
    res.render('./cms/projectsEdit', {
        project
    });
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
    req.flash('success', `Succesfully edited "${project.title}"`)
    res.redirect('/cms/index');
}))

// delete route for projects
router.delete('/:id', catchAsync(async (req, res) => {
    const {
        id
    } = req.params;
    const project = await Project.findByIdAndDelete(id);
    req.flash('success', `Succesfully deleted "${project.title}"`)
    res.redirect('/cms/index')
}));

// route for posting new project
router.post('/add', validateProject, catchAsync(async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    req.flash('success', `Succesfully created "${project.title}"!`)
    res.redirect('/cms/index');
}))

module.exports = router;