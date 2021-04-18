const Project = require('../models/project');

module.exports.index = async (req, res) => {
    const projects = await Project.find({});
    res.render('./cms/projectsIndex', {
        projects
    });
};

module.exports.showAddPage = (req, res) => {
    res.render('./cms/projectsAdd');
};

module.exports.addPage = async (req, res) => {
    const project = new Project(req.body);
    if (req.files.imgHome) {
        project.images.imgHome.url = req.files.imgHome[0].path;
        project.images.imgHome.filename = req.files.imgHome[0].filename;
    }
    if (req.files.imgProject1) {
        project.images.imgProject1.url = req.files.imgProject1[0].path;
        project.images.imgProject1.filename = req.files.imgProject1[0].filename;
    }
    if (req.files.imgProject2) {
        project.images.imgProject2.url = req.files.imgProject2[0].path;
        project.images.imgProject2.filename = req.files.imgProject2[0].filename;
    }
    await project.save();
    req.flash('success', `Succesfully created "${project.title}"!`)
    res.redirect('/cms/index');
};

module.exports.showEditProject = async (req, res) => {
    const {
        id
    } = req.params;
    const project = await Project.findById(id);
    if (!project) {
        req.flash('error', 'Unable to find Project')
        res.redirect('/cms/index')
    }
    res.render('./cms/projectsEdit', {
        project
    });
};

module.exports.editProject = async (req, res) => {
    const {
        id
    } = req.params;
    const project = await Project.findByIdAndUpdate(id, {
        ...req.body
    }, {
        new: true
    });
    if (req.files.imgHome) {
        project.images.imgHome.url = req.files.imgHome[0].path;
        project.images.imgHome.filename = req.files.imgHome[0].filename;
    }
    if (req.files.imgProject1) {
        project.images.imgProject1.url = req.files.imgProject1[0].path;
        project.images.imgProject1.filename = req.files.imgProject1[0].filename;
    }
    if (req.files.imgProject2) {
        project.images.imgProject2.url = req.files.imgProject2[0].path;
        project.images.imgProject2.filename = req.files.imgProject2[0].filename;
    };
    await project.save()
    req.flash('success', `Succesfully edited "${project.title}"`)
    res.redirect('/cms/index');
};

module.exports.deleteProject = async (req, res) => {
    const {
        id
    } = req.params;
    const project = await Project.findByIdAndDelete(id);
    req.flash('success', `Succesfully deleted "${project.title}"`)
    res.redirect('/cms/index')
};