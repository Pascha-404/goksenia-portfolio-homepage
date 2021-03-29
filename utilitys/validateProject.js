const {
    projectSchema
} = require('../schemas/projectSchema');
const ExpressError = require('../utilitys/expressError');

const validateProject = (req, res, next) => {
    const {
        error
    } = projectSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports = validateProject;