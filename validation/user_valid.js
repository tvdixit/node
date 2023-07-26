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

const bookingvalidation = {
    body: Joi.object().keys({
        event: Joi.string().required(),
        user: Joi.string().required(),
    })
}

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
module.exports = {
    UserValidation,
    bookingvalidation,
    eventvalidation,
    event_postvalidation

};