const Joi = require('joi');

const bookingvalidation = {
    body: Joi.object().keys({
        event: Joi.string().required(),
        user: Joi.string().required(),
    })
}
module.exports = {
    bookingvalidation,
}