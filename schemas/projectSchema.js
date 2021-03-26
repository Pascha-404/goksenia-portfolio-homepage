const Joi = require('joi');

module.exports.projectSchema = Joi.object({
    urlName: Joi.string()
        .trim()
        .min(3)
        .required(),

    title: Joi.string().trim().min(5).required(),

    description: {
        homeTxt: Joi.string().trim().max(10).required(),
        projectTxt: Joi.string().trim().required()
    },

    tags: {
        firstProject: Joi.boolean().truthy('true').falsy('false').sensitive(),
        latestWork: Joi.boolean().truthy('true').falsy('false').sensitive(),
        webDesign: Joi.boolean().truthy('true').falsy('false').sensitive(),
        webflow: Joi.boolean().truthy('true').falsy('false').sensitive(),
        concept: Joi.boolean().truthy('true').falsy('false').sensitive(),
        appDesign: Joi.boolean().truthy('true').falsy('false').sensitive(),
        hackathon: Joi.boolean().truthy('true').falsy('false').sensitive(),
        hideProject: Joi.boolean().truthy('true').falsy('false').sensitive()
    },

    // missing image option

    previewLink: Joi.string().allow('')
})