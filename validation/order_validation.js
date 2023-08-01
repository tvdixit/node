const Joi = require('joi');

const createOrderValidation = {
    body: Joi.object({
        quantity: Joi.number().required(),
        total_price: Joi.number().required(),
        charge: Joi.number().required(),
        order_name: Joi.string().required(),
        order_number: Joi.string().required(),
        additional_info: Joi.string(),
        order_status: Joi.string().required(),
        shipment_order: Joi.array().items(Joi.object().keys({
            address: Joi.string().required(),
            arrival_time: Joi.date().required(),
            statusCode: Joi.string().required(),
            order_id: Joi.string().required(),
            label: Joi.string(),
            value: Joi.number(),
            color: Joi.string(),
            bgcolor: Joi.string(),
        })),
        product: Joi.array().items(Joi.object().keys({
            product_id: Joi.string().required(),
            product_name: Joi.string().required(),
            product_price: Joi.number().required(),
            product_buyer_quantity: Joi.number().required(),
            product_discript: Joi.string(),
            product_unit: Joi.string().required(),
            product_quantity: Joi.number().required(),
        })),
    })
}

const idvalidation = {
    query: Joi.object().keys({
        id: Joi.string().required(),
    })
}

const updateOrdervalidation = {
    body: Joi.object({
        quantity: Joi.number().required(),
        total_price: Joi.number().required(),
        charge: Joi.number().required(),
        order_name: Joi.string().required(),
        order_number: Joi.string().required(),
        additional_info: Joi.string(),
        order_status: Joi.string().required(),
        shipment_order: Joi.array().items(Joi.object().keys({
            address: Joi.string().required(),
            arrival_time: Joi.date().required(),
            statusCode: Joi.string().required(),
            order_id: Joi.string().required(),
            label: Joi.string(),
            value: Joi.number(),
            color: Joi.string(),
            bgcolor: Joi.string(),
        })),
        product: Joi.array().items(Joi.object().keys({
            product_id: Joi.string().required(),
            product_name: Joi.string().required(),
            product_price: Joi.number().required(),
            product_buyer_quantity: Joi.number().required(),
            product_discript: Joi.string(),
            product_unit: Joi.string().required(),
            product_quantity: Joi.number().required(),
        })),
    })
}
module.exports = {
    createOrderValidation,
    idvalidation,
    updateOrdervalidation
}