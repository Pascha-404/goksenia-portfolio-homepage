const mongoose = require('mongoose')

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
    tags: {
        firstProject: {
            type: Boolean
        },
        secondProject: {
            type: Boolean
        },
        latestWork: {
            type: Boolean
        },
        webDesign: {
            type: Boolean
        },
        webflow: {
            type: Boolean
        },
        concept: {
            type: Boolean
        },
        appDesign: {
            type: Boolean
        },
        hackathon: {
            type: Boolean
        },
        hideProject: {
            type: Boolean
        }
    },
    images: {
        imgHome: {
            type: String,
            // required: true
        },
        imgProject1: {
            type: String,
            // required: true
        },
        imgProject2: {
            type: String
        }
    },
    previewLink: {
        type: String
    }
});

const Project = new mongoose.model('Project', projectSchema);

module.exports = Project;