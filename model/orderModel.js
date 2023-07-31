const { number, string } = require('joi').types();
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    charge: {
        type: Number,
        required: true,
    },
    order_name: {
        type: String,
        required: true,
    },
    order_number: {
        type: Number,
        required: true
    },
    additional_info: {
        type: String,
        required: true
    },
    order_status: {
        type: String,
        required: true
    },
    shipment_order: [
        {
            address: { type: String },
            arrival_time: { type: Number },
            statusCode: { type: Number },
            order_id: { type: String },
            label: { type: String },
            value: { type: String },
            color: { type: String },
            bgcolor: { type: String },
        },
    ],
    product: [
        {
            product_id: { type: String },
            product_name: { type: String },
            product_price: { type: String },
            product_buyer_quantity: { type: Number },
            product_discript: { type: String },
            product_image: { type: String },
            product_unit: { type: String },
            product_quantity: { type: Number },
        }
    ]
});

module.exports = mongoose.model('Order', OrderSchema)
