const Joi = require('joi');

const bookingvalidation = {
    body: Joi.object().keys({
        event: Joi.string().required(),
        user: Joi.string().required(),
    })
}
// const useridvalidation = {
//     body: Joi.object({
//         user_id: Joi.number().required(),
//     })
// }

const useridvalidation = {
    user: Joi.object().keys({
        email: Joi.number().required()
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