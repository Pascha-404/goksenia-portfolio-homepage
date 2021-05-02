const Project = require('../models/project');
const ExpressError = require('../utilitys/expressError');

module.exports.showHomePage = async (req, res) => {
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

    // searches for hidden projects
    const hiddenProjects = await Project.find({
        'tags.hideProject': {
            $eq: true
        }
    })

    const analyticsActive = true;

    res.render('index', {
        firstProjects,
        secondProjects,
        latestProjects,
        projects,
        hiddenProjects,
        analyticsActive
    })
};

module.exports.showProjectPage = async (req, res) => {
    const {
        urlName
    } = req.params;

    const project = await Project.findOne({
        urlName: urlName
    });

    const analyticsActive = true;

    if (!project) throw new ExpressError('Project Not Found', 404);
    res.render('projects', {
        project,
        analyticsActive
    });

};