const Joi = require('joi');

const reviewvalidation = Joi.object({
    description: Joi.string().required(),
    star_rating: Joi.number().integer().min(1).max(5).required(),
    user_id: Joi.string().required(),
    event_id: Joi.string().required()
});
const idSchema = {
    query: Joi.object().keys({
        id: Joi.string().required(),
    })
}

module.exports = {
    reviewvalidation,
    idSchema,

}