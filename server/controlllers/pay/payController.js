const crypto = require("crypto");
const axios = require("axios");
const uniqid = require("uniqid");
const { setTimeout } = require("timers");
const transactionModel = require("../../models/transactionModel/transactionModel");
const orderModel = require("../../models/orderModel/orderModel");
const { Console } = require("console");
const { json } = require("express");

const giveUniqueId = (length) => {
  return "TAFI" + uniqid(length);
};
const merchantTransactionId = giveUniqueId(16);

//redirecting to PhonePe for payment facilitation
exports.payFunction = async (req, res) => {
  try {
    // console.log("hii");
    const merchantTransactionId = giveUniqueId(16); // use uniqid package for generating this
    // console.log(merchantTransactionId);
    const { amount, cartId } = req.body;
    const data = {
      //Required data structure for the pay API call
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: process.env.MERCHANT_USER_ID,
      amount: amount * 100,
      redirectUrl: `http://localhost:8080/api/pay/checkStatus?transactionId=${merchantTransactionId}&cartId=${cartId}`, //url to be redirected post complete transaction
      redirectMode: "REDIRECT",
      callbackUrl: "https://localhost:8080/api/pay/getOrderLog", //url to post complete transaction response by API
      mobileNumber: process.env.MOBILE_NUMBER,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    console.log(merchantTransactionId);
    console.log(cartId);

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const string =
      payloadMain + "/pg/v1/pay" + process.env.PHONEPE_API_SALT_KEY;
    const SHA256 = crypto.createHash("SHA256").update(string).digest("hex");
    const checksum = SHA256 + "###" + process.env.KEY_INDEX; // required value for sendin in the X_VERIFY field in header

    console.log("               ");
    console.log("payload", payload);
    console.log("                           ");
    console.log(checksum);
    console.log("                                ");
    console.log(payloadMain);


    const options = {
      //required options structure for the API call
      method: "post",
      url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    console.log(checksum);

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.data.instrumentResponse.redirectInfo.url);
        // return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
        res.json({
          success: true,
          data: response.data.data.instrumentResponse.redirectInfo.url,
        });
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send({
          message: "Error in connecting to PhonePe Try sometime later",
          success: false,
        });
      });
  } catch (error) {
    res
      .status(500)
      .send({
        message: error.message,
        success: false,
      })
      .then();
  }
};

exports.checkStatusFunction = async (req, res) => {
  const { transactionId, cartId, isRefund } = req.query;
  console.log("data", transactionId, cartId, isRefund);
  if (isRefund) {
    const string =
      `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` +
      process.env.PHONEPE_API_SALT_KEY;
    const SHA256 = crypto.createHash("SHA256").update(string).digest("hex");
    const checksum = SHA256 + "###" + process.env.KEY_INDEX;
    // console.log("                                        ")
    // console.log(checksum)
    const options = {
      method: "get",
      url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${process.env.MERCHANT_ID}`,
      },
    };
    let n = 1;
    let status = await statusCall(n, options, cartId);
    console.log(status);
    if (status) {
      //Here the cartId is holding the value of orderId during the call
      const order = await orderModel.findOneAndUpdate(
        {
          _id: cartId,
        },
        {
          transactionStatus: "REFUNDED",
        }
      );
      if (order) {
        res.json({
          success: true,
          message: "Transaction Refunded Successfully",
        });
      } else {
        res.json({
          success: false,
          message: "Transaction Refunded Failed",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Transaction Refunded Failed",
      });
    }
    // if (status) {
    //   return res.redirect("http://localhost:8080/");
    // } else {
    //   return res.status(500).send({
    //     success: false,
    //     message: "Check status returned failed status of transaction",
    //   });
    // }
  } else {
    const string =
      `/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}` +
      process.env.PHONEPE_API_SALT_KEY;
    const SHA256 = crypto.createHash("SHA256").update(string).digest("hex");
    const checksum = SHA256 + "###" + process.env.KEY_INDEX;
    const options = {
      method: "get",
      url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}`,
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${process.env.MERCHANT_ID}`,
      },
    };
    let n = 1;
    let status = await statusCall(n, options, cartId);
    console.log(status);
    console.log(`This is the status ${status.success}`);
    if (status.success) {
      console.log("setitem", status.success);
      // Append the success status as a query parameter to the redirect URL
      return res.redirect(
         `http://twicks.in/OrderConfirmationPage/${status.orderId}?success=${status.success}`
      );
     } else {
      console.log("setitem", res.success);
      res.success = false;
      return res.redirect(
         `http://twicks.in/OrderConfirmationPage/${status.orderId}?success=${status.success}`
      );
      
     }
     
  }
};

async function statusCall(n, options, cartId) {
  try {
    // console.log("1" + cartId);
    if (cartId == null) {
      let response = await axios.request(options);
      console.log("2" + response);
      if (response.data.success === true) {
        console.log("3" + "true status");
        return true;
      } else {
        if (n === 0) {
          return false;
        } else {
          // Correctly use setTimeout with a callback function
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(statusCall(--n, options, null));
            }, 3000);
          });
        }
      }
    } else {
      console.log("BHVHFY")
      let response = await axios.request(options);
      console.log("JDVCGHDV")
      console.log(response)
      if (response.data.success === true) {
        console.log(response);
        try {
          const { data } = await axios.post(
            "http://localhost:8080/api/placeOrder",
            {
              cartId: cartId,
              transactionId: response.data.data.transactionId,
              amount: response.data.data.amount,
              transactionStatus: response.data.data.state,
            }
          );
          console.log("#########################");
          console.log(data);
         
          console.log("#########################");
              
          const responseData = await transactionModel({ 
            orderId:data.data._id,  
            transactionId:data.data.transactionId,
            merchantTransactionId:merchantTransactionId,
            shipment_charge:data.data.shipment_charge,
            merchantUserId:process.env.MERCHANT_ID,
            amount: data.data.amount,
            status: "payment Successfull",
            cartId: cartId
          });
          console.log("=============================");
          console.log(responseData);
          responseData.save();
          console.log("=======================");
          console.log(cartId)

          if (data.success) {
            const { data: request } = await axios.post(
              "http://localhost:8080/api/ship/requestApproval",
              {
                orderId: data.data._id,
              }
            );
            if (request.success) {
              return {
                success: true,
                orderId: data.data._id,
              };
            } else {
              return { success: false };
            }
          }
        } catch (error) {
          console.log(error);
          console.log("failure in saving new transaction");
          return { success: false };
        }
      } else {
        if (n === 0) {
          return { success: false };
        } else {
          // Correctly use setTimeout with a callback function
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(statusCall(--n, options, cartId));
            }, 3000);
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.getOrderLogFunction = async (req, res) => {
  try {
    console.log(req); //logging the post req. recieved at the callBack url upon transaction completion
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message:
        "ERROR IN GETTING POST REQUEST FROM THE PHONEPE API CONFIRMING PAYMENT INITIATION",
      success: false,
    });
  }
};

exports.refundFunction = async (req, res) => {
  try {
    const { transactionId, orderId } = req.body;
    const refundTransId = giveUniqueId(16);
    const refundEntry = await orderModel.findOne({
      _id: orderId,
    }); //amount that has to be refunded from the paymentModel referring to successfull transactions
       const transactionDetails = await transactionModel.findOne({orderId:orderId})
console.log(transactionDetails)
    const refundAmount = (refundEntry.amount + refundEntry.shipment_charge)/100;
    const data = {
      merchantId: process.env.MERCHANT_ID,
      merchantUserId: process.env.MERCHANT_USER_ID,
      originalTransactionId:  merchantTransactionId,
      merchantTransactionId: refundTransId,
      amount: refundAmount, //change this to the value from the payments model
      callbackUrl: "http://localhost:8080/api/pay/getOrderLog",
    };
    console.log("data: " + JSON.stringify(data) , data.merchantTransactionId,data.originalTransactionId);
    const payload = JSON.stringify(data);

    const payloadMain = Buffer.from(payload).toString("base64");
    console.log("payloadMain", payloadMain);
    const string =
      payloadMain + "/pg/v1/refund" + process.env.PHONEPE_API_SALT_KEY;
    const SHA256 = crypto.createHash("SHA256").update(string).digest("hex");
    const checksum = SHA256 + "###" + process.env.KEY_INDEX;
    console.log("checksum", checksum);
    // SHA256(base64 encoded payload + “/pg/v1/refund” + salt key) + ### + salt index

    // HEADER STRUCTURE AND OPTIONS MANDATORY FOR REFUND PAYMENT
    const options = {
      method: "post",
      url: "https://api.phonepe.com/apis/hermes/pg/v1/refund",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };
    console.log("data found through the api ");
    await axios
      .request(options)
      .then(async function (response) {
        console.log("data found here??");
        console.log("data found",response?.data); //RESPONSE FROM THE REFUND PROCESS API
        try {
          const { data } = await axios.get(
            `http://localhost:8080/api/pay/checkStatus?transactionId=${response.data.transactionId}&cartId=${orderId}&isRefund=1`
          );
          console.log("data", data);
          if (data.success) {
            res.status(500).send({
              success: true,
              message: "PAYMENT Refunded",
            });
          } else {
            res.status(500).send({
              success: false,
              message: "Failed to refund your payment.",
            });
          }
        } catch (err) {
          console.log(err);
          res.status(500).send({
            success: false,
            message: "ERROR IN FINDING AND UPDATING PAYMENT TRANSACTION",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 500) {
          // console.log(error.response.status);
          res.status(500).send({
            success: false,
            message: "ERROR IN REFUNDING THE PAYMENT status 500",
          });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "ERROR IN REFUNDING THE PAYMENT",
    });
  }
};
