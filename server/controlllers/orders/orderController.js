const orderModel = require("../../models/orderModel/orderModel.js");
const orderCountModel = require("../../models/orderModel/orderCountModel.js");
const cartModel = require("../../models/cartModel/cartModel.js");
const userAddress = require("../../models/userModel/userAddress.js");

module.exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.find({}).populate('products.productId');
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getOrderById = async (req, res, next) => {
    try {
         const id = req.params.id;
        const orders = await orderModel.findOne({ _id: req.params.id }).populate('products.productId').populate('user').populate('userAddress');
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log("wrong ");
        return res.json({
                status:401,
                success:false,
                message:"Wrong order Id"
             })
    }
}

module.exports.getAllOrdersByStatus = async (req, res, next) => {
    try {
        const { OrderStatus } = req.params.orderStatus;
        const orders = await orderModel.find({ orderStatus: OrderStatus });
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.json({ success: false, error: error });
        next(error);
    }
}

module.exports.getAllOrderByUser = async (req, res, next) => {
    try {
        const orders = await orderModel.find({ user: req.params.userId }).populate('products.productId').populate('user').populate('userAddress');
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

module.exports.placeOrder = async (req, res, next) => {
    try {
        const { cartId, transactionId, amount, transactionStatus } = req.body;
        console.log(`${cartId} - ${transactionId} - ${amount} - ${transactionStatus}`);
        const cart = await cartModel.findOne({ _id: cartId }).populate('products.productId');
        if (cart) {
            let totalAmount = 0;
            for (let i = 0; i < cart.products.length; i++) {
                totalAmount += cart.products[i].productId.price * cart.products[i].units;
            }
            const address = await userAddress.findOne({ userId: cart.userId });
            const newOrder = new orderModel({
                products: cart.products,
                user: cart.userId,
                amount: totalAmount,
                shipment_charge: amount - totalAmount,
                transactionId: transactionId,
                transactionStatus: transactionStatus,
                userAddress: address._id,
                status:''
            });
            await newOrder.save();

            for (var i = 0; i < cart.products.length; i++) {

                const product = await orderCountModel.findOne({ productId: cart.products[i].productId });
                if (product) {
                    await orderCountModel.findOneAndUpdate(
                        { productId: cart.products[i].productId },
                        { $inc: { orderCount: cart.products[i].units } },
                        { new: true }
                    );
                } else {
                    const newOrderCount = new orderCountModel({
                        productId: cart.products[i].productId,
                        count: cart.products[i].units
                    });
                    await newOrderCount.save();
                }
            }
            await cartModel.findOneAndDelete({ _id: cartId });
            res.status(200).json({
                success: true,
                data: newOrder
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to create order"
        })
        next(error);
    }
};

module.exports.getAllOrderCounts = async (req, res, next) => {
    try {
        const orders = await orderCountModel.find({});
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.json({ success: false, message: error.toString() });
        next(error);
    }
};

module.exports.cancelOrders = async (req, res, next) => {
    const { orderId } = req.params.orderId;
    let order = await orderModel.findOne({ _id: orderId });
    if (order && (order.transactionStatus === "PENDING" || order.transactionStatus === "PLACED")) {
        order = order.toObject();
        order.transactionStatus = "CANCELLED";
        await orderModel.findOneAndUpdate({ _id: orderId }, order, { new: true });
        res.status(200).json({
            success: true,
            data: order
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Order cannot be canceled"
        });
    }
};

module.exports.updateOrder = async (req,res) =>{
   const id = req.params.id

    let order = await orderModel.findOne({ _id: id });
    order.status = ""

    if (order) {
        order = order.toObject();
        order.status = req.body.status;
        order.orderStatus = req.body.orderStatus;
   
        await orderModel.findOneAndUpdate({ _id: id }, order, { new: true });
        res.status(200).json({
            success: true,
            data: order
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }
}