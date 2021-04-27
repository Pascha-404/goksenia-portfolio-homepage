const Joi = require('joi');

module.exports.projectSchema = Joi.object({
    urlName: Joi.string()
        .trim()
        .min(3)
        .required(),

    title: Joi.string().trim().min(5).required(),

    description: {
        homeTxt: Joi.string().trim().required(),
        projectTxt: Joi.string().trim().required()
    },

    tags: {
        firstProject: Joi.number().min(0).max(1),
        secondProject: Joi.number().min(0).max(1),
        latestWork: Joi.number().min(0).max(1),
        webDesign: Joi.number().min(0).max(1),
        webflow: Joi.number().min(0).max(1),
        concept: Joi.number().min(0).max(1),
        appDesign: Joi.number().min(0).max(1),
        hackathon: Joi.number().min(0).max(1),
        hideProject: Joi.number().min(0).max(1)
    },

    images: {
        imgHome: {
            url: Joi.string().allow(''),
            filename: Joi.string().allow('')
        },
        imgProject1: {
            url: Joi.string().allow(''),
            filename: Joi.string().allow('')
        },
        imgProject2: {
            url: Joi.string().allow(''),
            filename: Joi.string().allow('')
        }
    },

    deleteImg: Joi.array(),

    previewLink: Joi.string().allow('')
})