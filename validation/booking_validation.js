const Joi = require('joi');

const bookingvalidation = {
    body: Joi.object().keys({
        event: Joi.string().required(),
        user: Joi.string().required(),
    })
}
const useridvalidation = {
    headers: Joi.object({
        user_id: Joi.string().length(24).hex().required(),
    })
}
const UpdatebookingValidation = {
    body: Joi.object({
        event: Joi.string().required(),
        user: Joi.string().required()
    }),
}
module.exports = {
    bookingvalidation,
    useridvalidation,
    UpdatebookingValidation
}