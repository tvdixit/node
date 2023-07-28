const Joi = require('joi');

const eventvalidation = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        date: Joi.date().required(),
        creator: Joi.string().required(),
    })
}
const event_postvalidation = Joi.object({
    image: Joi.string().required(),
    created_date: Joi.date().required(),
    event_id: Joi.number().integer().required()
});
const idSchema = {
    query: Joi.object().keys({
        id: Joi.string().required(),
    })
}

module.exports = {
    eventvalidation,
    event_postvalidation,
    idSchema
}