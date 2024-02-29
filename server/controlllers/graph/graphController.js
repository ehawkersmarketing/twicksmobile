const orderModel = require('../../models/orderModel/orderModel')

exports.getGraph = async (req, res) => {
    try {
        const {orderId , orderStatus} = req.body
      const graph = await orderModel.find({}).populate('products.productId');
      if (!graph) {
        return res.status(200).send({
          success: false,
          message: "No data found for graph analysis",
        });
      }
      return res.status(200).send({
        success: true,
        message: "All data found to create graph",
        data: graph,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error in getting the data ",
        error,
      });
    }
  };