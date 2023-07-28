const Joi = require('joi');

const UserValidation =
    Joi.object({
        profil_photo: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    })
// Joi.object({
//     profile_photo: Joi.string().required(), // You can add more validation rules here if needed
//     first_name: Joi.string().required(),
//     last_name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     createdEvent: Joi.string(),
//     personalDetail: Joi.string(),
// });


module.exports = {
    UserValidation,
};