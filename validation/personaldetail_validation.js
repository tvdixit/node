const Joi = require('joi');

const personalDetail_validation = Joi.object({
    phone: Joi.number().min(10).required(),
    gender: Joi.string().required(),
    age: Joi.number().required(),
    city: Joi.string().required()
});
const useridvalidation = {
    headers: Joi.object({
        user_id: Joi.string().length(24).hex().required(),
    })
}

const updatePersonalvalidation = {
    body: Joi.object({
        phone: Joi.string().required(),
        gender: Joi.string().valid('male', 'female', 'other').required(),
        age: Joi.number().integer().min(18).required(),
        city: Joi.string().required(),
    })
}
module.exports = {
    personalDetail_validation,
    useridvalidation,
    updatePersonalvalidation
}