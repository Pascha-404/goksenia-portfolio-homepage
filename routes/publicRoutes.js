const express = require('express');
const router = express.Router();

const catchAsync = require('../utilitys/catchAsync')

const Project = require('../models/project');

// route for mainpage
router.get('/', catchAsync(async (req, res) => {
    // searches for projects with firstProject tag = true
    const firstProjects = await Project.find({
        'tags.firstProject': true,
        'tags.hideProject': {
            $ne: true
        }
    });

    const secondProjects = await Project.find({
        'tags.secondProject': true,
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
        'tags.secondProject': {
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
        'tags.secondProject': {
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
        secondProjects,
        latestProjects,
        projects
    })
}));

// route for single projectpage
router.get('/project/:urlName', catchAsync(async (req, res) => {
    const {
        urlName
    } = req.params;
    const project = await Project.findOne({
        urlName: urlName
    });
    if (!project) throw new ExpressError('Project Not Found', 404);
    res.render('projects', {
        project
    });

}));

module.exports = router;