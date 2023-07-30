const Joi = require('joi');

const status_validation = Joi.object({
    first_name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('pending', 'in progress', 'completed').required(),
    date: Joi.date().iso().required(),
    user_id: Joi.string().required(),
});

const useridvalidation = {
    body: Joi.object({
        user_id: Joi.string().required(),
    })
}
const statusMatchvalidation = {
    body: Joi.object({
        status: Joi.string().valid('pending', 'completed', 'in-progress').required(),
    })
}
module.exports = {
    status_validation,
    useridvalidation,
    statusMatchvalidation
}