const transactionModel = require('../../models/transactionModel');

exports.createTransaction = async (req, res) => {
   try {
    const {transactionId  , refundTransactionId , amount , status,cartId} = req.body;
   
    const transaction = new transactionModel({
        transactionId: transactionId,
        refundTransactionId: refundTransactionId,
        amount: amount,
        status: status,
        cartId: cartId
    })

    const data = await transaction.save();
    res.status(200).send({
        success: true,
        message: "Transaction created successfully",
        data: data
    })
   } catch (error) {
    console.log("transaction error")
     return res.status({
         success: false,
         message: error
     })
   }

}