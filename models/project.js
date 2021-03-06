const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('projectImgSize').get(function () {
    return this.url.replace('/upload', '/upload/w_1100,f_auto,q_auto')
});
ImageSchema.virtual('homeImgSize').get(function () {
    return this.url.replace('/upload', '/upload/w_610,f_auto,q_auto')
});
ImageSchema.virtual('cmsImgSize').get(function () {
    return this.url.replace('/upload', '/upload/w_380,f_auto,q_auto')
});
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_250,h_210,f_auto,q_auto,c_fit')
})

// database schema and model
const projectSchema = new Schema({
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
            type: Number
        },
        secondProject: {
            type: Number
        },
        latestWork: {
            type: Number
        },
        webDesign: {
            type: Number
        },
        webflow: {
            type: Number
        },
        concept: {
            type: Number
        },
        appDesign: {
            type: Number
        },
        hackathon: {
            type: Number
        },
        hideProject: {
            type: Number
        }
    },
    images: {
        imgHome: ImageSchema,
        imgProject1: ImageSchema,
        imgProject2: ImageSchema
    },
    previewLink: {
        type: String
    }
});

const Project = new mongoose.model('Project', projectSchema);

module.exports = Project;