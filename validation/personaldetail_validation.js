const Joi = require('joi');

const personalDetail_validation = Joi.object({
    phone: Joi.number().min(10).required(),
    gender: Joi.string().required(),
    age: Joi.number().required(),
    city: Joi.string().required()
});
module.exports = {
    personalDetail_validation,
}