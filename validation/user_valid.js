const Joi = require('joi');

const UserValidation = Joi.object({
    files: Joi.object().keys({
        profile_photo: Joi.string(),
    }),
    body: Joi.object().keys({
        first_name: Joi.string().min(3).max(10).required(),
        last_name: Joi.string().min(3).max(10).required(),
        email: Joi.string().email().min(5).max(15).optional().required(),
        password: Joi.string().min(8).trim(true).required(),
    })
});

module.exports = {
    UserValidation,
}