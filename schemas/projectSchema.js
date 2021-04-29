const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not contain any html tags.',
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {}
                });
                if (clean !== value) {
                    return helpers.error('string.escapeHTML', {
                        value
                    })
                } else {
                    return clean;
                }
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.projectSchema = Joi.object({
    urlName: Joi.string()
        .trim()
        .min(3)
        .required()
        .escapeHTML(),

    title: Joi.string()
        .trim()
        .min(5)
        .required()
        .escapeHTML(),

    description: {
        homeTxt: Joi.string()
            .trim()
            .required()
            .escapeHTML(),

        projectTxt: Joi.string()
            .trim()
            .required()
            .escapeHTML()
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
            url: Joi.string()
                .allow('')
                .escapeHTML(),

            filename: Joi.string()
                .allow('')
                .escapeHTML()
        },
        imgProject1: {
            url: Joi.string()
                .allow('')
                .escapeHTML(),

            filename: Joi.string()
                .allow('')
                .escapeHTML()
        },
        imgProject2: {
            url: Joi.string()
                .allow('')
                .escapeHTML(),

            filename: Joi.string()
                .allow('')
                .escapeHTML()
        }
    },

    deleteImg: Joi.array(),

    previewLink: Joi.string().allow('').escapeHTML()
})