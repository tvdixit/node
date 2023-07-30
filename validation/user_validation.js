const Joi = require('joi');
const { file } = require('loader');

const CreateUserValidation = {
    body: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
    // file: Joi.object({
    //     profile_photo: Joi.array().items(
    //         Joi.object({
    //             mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
    //             filename: Joi.string().required()
    //         })
    //     ).min(1).max(5).required()
    // })
}
// Joi.object({
//     profile_photo: Joi.string().required(), // You can add more validation rules here if needed
//     first_name: Joi.string().required(),
//     last_name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     createdEvent: Joi.string(),
//     personalDetail: Joi.string(),
// });

const UpdateUserValidation = {
    body: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
    }),
}

const loginUserValidation = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
}

const useridvalidation = {
    headers: Joi.object({
        user_id: Joi.string().length(24).hex().required(),
    })
}
module.exports = {
    CreateUserValidation,
    UpdateUserValidation,
    loginUserValidation,
    useridvalidation

};