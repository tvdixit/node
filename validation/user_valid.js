const Joi = require('joi');

const UserValidation = Joi.object({
    user: Joi.object().keys({
        user_id: Joi.string(),
    }),
    file: Joi.object().keys({
        profile_photo: Joi.string(),
    }),
    body: Joi.object().keys({
        first_name: Joi.string().min(3).max(10).required(),
        last_name: Joi.string().min(3).max(10).required(),
        email: Joi.string().email().min(5).max(35).optional().required(),
        password: Joi.string().min(8).trim(true).required(),
    })
});

module.exports = UserValidation;