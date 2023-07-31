const dotenv = require("dotenv");
dotenv.config();
const Order = require("../model/orderModel");

// post orderdetail:
const order = async (req, res) => {
    try {
        // console.log(req.body, "body");
        console.log(req.body.shipment_order[0].address, "================>>>>>>>>>>>>>>");
        const orderdata = new Order({
            quantity: req.body.quantity,
            total_price: req.body.total_price,
            charge: req.body.charge,
            order_name: req.body.order_name,
            order_number: req.body.order_number,
            additional_info: req.body.additional_info,
            order_status: req.body.order_status,
            shipment_order: [{
                address: req.body.shipment_order[0].address,
                arrival_time: req.body.shipment_order[0].arrival_time,
                statusCode: req.body.shipment_order[0].statusCode,
                order_id: req.body.shipment_order[0].order_id,
                label: req.body.shipment_order[0].label,
                value: req.body.shipment_order[0].value,
                color: req.body.shipment_order[0].color,
                bgcolor: req.body.shipment_order[0].bgcolor,
            }],
            product: [{
                product_id: req.body.product[0].product_id,
                product_name: req.body.product[0].product_name,
                product_price: req.body.product[0].product_price,
                product_buyer_quantity: req.body.product[0].product_buyer_quantity,
                product_discript: req.body.product[0].product_discript,
                product_image: req.files[0].filename,
                product_unit: req.body.product[0].product_unit,
                product_quantity: req.body.product[0].product_quantity,
            }]
        })
        // console.log(orderdata, "orderdata");
        const savedData = await orderdata.save();
        // console.log(savedData, "saveddata");
        res.status(200).json({ savedData });

        // console.log(req.files[0].filename);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// get orderdata
const OrderData = async (req, res) => {
    try {
        const data = await Order.findById(req.query.id);

        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update orderdata
const Updateorderdata = async (req, res) => {
    try {
        const updatedData = req.body
        await Order.findByIdAndUpdate(req.query.id,
            updatedData).then(async (data) => {
                var item = await Order.findById(data._id);
                res.send(item)
            })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteorderData = async (req, res) => {
    try {
        const data = await Order.findOneAndDelete(req.params.id);
        res.json({ success: true, message: "delete data successfully", data })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    order,
    OrderData,
    Updateorderdata,
    deleteorderData
}