const crypto = require("crypto");
const axios = require("axios");
const uniqid = require("uniqid");
const { setTimeout } = require("timers");
const requestModel = require("../../models/shipmentModel/shipmentModel");
const orderModel = require("../../models/orderModel/orderModel");
const userAddress = require("../../models/userModel/userAddress");

//Request approval handling
exports.requestApproval = async (req, res) => {
  try {
    const { orderId } = req.body;
    const request = new requestModel({
      orderId: orderId,
    });
    const data = await request.save();

    if (data) {
      res.json({
        success: true,
        message: "Request Sent",
      });
    } else {
      res.json({
        success: false,
        message: "Request failed",
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
};

//POST || approval of request of an order from admin
exports.approveRequest = async (req, res) => {
  try {
    // console.log('called')
    const { orderId, length, breadth, height, weight } = req.body;
    const request = await requestModel.findOne({ orderId: orderId });
    if (request) {
      const data = await requestModel.findOneAndUpdate(
        { orderId: orderId },
        {
          approvalStatus: "APPROVED",
        }
      );
      await orderModel.findOneAndUpdate({
        _id: request.orderId,
      }, {
        length: length,
        breadth: breadth,
        height: height,
        weight: weight,
      });
      if (data) {
        const order = await orderModel.findOne({ _id: request.orderId }).populate("products.productId").populate("user").populate("userAddress");
        let orderItems = [];
        for (let i = 0; i < order.products.length; i++) {
          orderItems.push({
            name: order.products[i].productId.title,
            sku: order.products[i].productId._id,
            units: order.products[i].units,
            selling_price: order.products[i].productId.price,
            discount: 0,
            tax: 0
          })
        }

        console.log("request accept atapprovalrequest",request);
        // console.log();
        let time = order.timestamps.toISOString();
        axios.post("http://localhost:8080/api/ship/createOrder",
          {
            order_id: `${order._id}`,
            // order_id: `dfdrgses`,
            order_date: `${time.substring(0, 10)}`,
            pickup_location: "Primary",
            billing_customer_name: `${order.user.userName}`,
            billing_last_name: `${order.user.userName}`,
            billing_address: `${order.userAddress.street}, ${order.userAddress.landmark}`,
            billing_address_2: "",
            billing_city: `${order.userAddress.city}`,
            billing_pincode: parseInt(order.userAddress.zipCode),
            billing_state: `${order.userAddress.state}`,
            billing_country: `${order.userAddress.country}`,
            billing_email: `uditsathe@gmail.com`,
            billing_phone: `${order.user.phone}`,
            billing_alternate_phone: "",
            shipping_is_billing: 0,
            shipping_customer_name: `${order.user.userName}`,
            shipping_last_name: `${order.user.userName}`,
            shipping_address: `${order.userAddress.street}, ${order.userAddress.landmark}`,
            shipping_address_2: "",
            shipping_city: `${order.userAddress.city}`,
            shipping_pincode: parseInt(order.userAddress.zipCode),
            shipping_country: `${order.userAddress.country}`,
            shipping_state: `${order.userAddress.state}`,
            shipping_email: "uditsathe@gmail.com",
            shipping_phone: `${order.user.phone}`,
            order_items: orderItems,
            payment_method: "Prepaid",
            sub_total: order.amount,
            total_discount: 0,
            length: length,
            breadth: breadth,
            height: height,
            weight: weight
          }
        ).then(async(shipment) => {
                 console.log("shippment whenodercreated",shipment)
          if (shipment) {
            await orderModel.findOneAndUpdate({
              _id: request.orderId,
            }, {      
              orderStatus: "COMPLETED"
            });
            res.json({
              success: true,
              message: "Request Approved",
            });
          } else {
            res.json({
              success: false,
              message: "Failed to Approve Request",
            });
          }
        }).catch((error) => {
          console.log(error);
        });
      } else {
        res.json({
          success: false,
          message: "Request Approval Failed",
        });
      }
    }
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
};

//POST|| when admin rejects an order approval request
exports.cancelApprovalRequest = async (req, res) => {
  try {
    console.log("yes sir")
    const { orderId } = req.body;
    console.log("heelo",orderId)
    const request = await requestModel.findOne({ orderId: orderId });
    if (request) {
      console.log("requestConsole",request)
      const data = await requestModel.findOneAndUpdate(
        { orderId:orderId}, 
        {
          approvalStatus: "REJECTED",
        }
        , { new: true }
      ); 
      if (data) {
        console.log("csjvidnidu data" , data)
        const order = await orderModel.findOneAndUpdate(
          { _id: data.orderId },
          {
            orderStatus: "REJECTED",
          }
        );
        if (order) {
          console.log("========================================")
          const { data: payRefund } = await axios.post(
            "http://localhost:8080/api/pay/refund",
            {
              transactionId: order.transactionId,
              orderId: order._id,
            }
          );
          if (payRefund) {
            console.log("pay refund")
            res.json({
              success: true,
              message: "Refunded",
            });
          } else {
            res.json({
              success: true,
              message: "Failed to initiate refund",
            });
          }
        } else {
          res.json({
            success: false,
            message: "Order Rejection Failed",
          });
        }
      } else { 
        res.json({
          success: false,
          message: "Request Rejection Failed",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Request Not found",
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "Error in cancel request approval",
    });
  }
};

//GET || getting cost alternatives for different courier services
exports.calcShipment = async (req, res) => {
  const { shipping_postcode, weight, declared_value, is_return } = req.body;
  let rs_data = await srShippingRateCalculation(
    shipping_postcode,
    weight,
    declared_value,
    is_return
  );
  console.log("==============**********************")

  console.log(rs_data);
  console.log("==============**********************")


  function srShippingRateCalculation(
    shipping_postcode,
    weight,
    declared_value,
    is_return
  ) {
    return new Promise(async (resolve, reject) => {
      let resData = {
        status: false,
        mainToken: {},
        message: "Fail!!",
      };
      try {
        let getToken = await srlogin();
        // console.log("below is the api key token recieved");
        // console.log(getToken);

        let paramers = "pickup_postcode=" + process.env.SHOP_PINCODE;
        paramers += "&delivery_postcode=" + shipping_postcode;
        paramers += "&weight=" + weight;
        paramers += "&cod=" + 0;
        paramers += "&declared_value=" + declared_value;
        paramers += "&rate_calculator=1";
        paramers += "&is_return=" + is_return;

        if (getToken.status) {
          // console.log(getToken.mainToken);
          var options = {
            method: "get",
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken.mainToken}`,
            },
            url:
              "https://apiv2.shiprocket.in/v1/external/courier/serviceability?" +
              paramers,
          };
          axios(options)
            .then(function (response) {
              console.log(
                "Following are the delivery companies available for the delivery service: "
              );
              console.log(response.data.data);
              let minRateObject =
                response.data.data.available_courier_companies.reduce(
                  (prev, curr) => {
                    return prev.rate < curr.rate ? prev : curr;
                  }
                );
              // console.log(
              //   "The minimum rate for delivery is:" +
              //   minRateObject.rate +
              //   "\n" +
              //   "The estimated time of delivery for the service is: " +
              //   minRateObject.etd +
              //   "\n" +
              //   "The name of the service is: " +
              //   minRateObject.courier_name
              // );
              resData.status = true;
              resData.message = "Success!!";
              resData.mainset = response.data;
              console.log("==============")
              console.log(resData);
              console.log("==============")

              res.json({
                success: true,
                shipPrice: minRateObject.rate,
              });
            })
            .catch(function (error) {
              console.log("Calculate shipment failure");
              console.log(error);
              resData.status = false;
              resData.message = "Error!!";
              resData.mainset = JSON.stringify(error);
              console.log(resData);
              return resData;
            });
        } else {
          console.log("Token failure");
          resData.status = false;
          resData.message = "Error!! token failure";
          return resData;
        }
      } catch (e) {
        console.error(e);
        resData.status = false;
        resData.message = "Error!!";
        return resData;
      }
    });
  }
};

//POST || creating a new order to be shipped ||SET PICKUP LOCATION IN ACCOUNT IT IS MANDATORY
exports.createOrder = async (req, res) => {
  console.log("dsjhbuygesufheys");
  const {
    pickup_location,
    order_id,
    order_date,
    payment_method,
    channel_id,
    comment,
    reseller_name,
    company_name,
    billing_customer_name,
    billing_last_name,
    billing_address,
    billing_address_2,
    billing_city,
    billing_pincode,
    billing_state,
    billing_country,
    billing_email,
    billing_phone,
    billing_alternate_phone,
    shipping_customer_name,
    shipping_last_name,
    shipping_address,
    shipping_address_2,
    shipping_city,
    shipping_pincode,
    shipping_country,
    shipping_state,
    shipping_email,
    shipping_phone,
    order_items, //array
    sub_total,
    total_discount,
    length,
    breadth,
    height,
    weight,
  } = req.body;
  await newShipFunction();

  async function newShipFunction() {
    let getToken = await srlogin();
    console.log("below is the api key token recieved");
    console.log(getToken);

    if (getToken.status) {
      await axios
        .post(
          "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
          {
            order_id: order_id,
            order_date: order_date,
            payment_method: payment_method,
            pickup_location: pickup_location,
            billing_customer_name: billing_customer_name,
            billing_last_name: billing_last_name,
            billing_address: billing_address,
            billing_address_2: billing_address_2,
            billing_city: billing_city,
            billing_pincode: billing_pincode,
            billing_state: billing_state,
            billing_country: billing_country,
            billing_email: billing_email,
            billing_phone: billing_phone,
            billing_alternate_phone: billing_alternate_phone,
            shipping_is_billing: 1,
            shipping_customer_name: shipping_customer_name,
            shipping_last_name: shipping_last_name,
            shipping_address: shipping_address,
            shipping_address_2: shipping_address_2,
            shipping_city: shipping_city,
            shipping_pincode: shipping_pincode,
            shipping_country: shipping_country,
            shipping_state: shipping_state,
            shipping_email: shipping_email,
            shipping_phone: shipping_phone,
            order_items: order_items,
            payment_method: payment_method,
            sub_total: sub_total,
            total_discount: total_discount,
            length: length,
            breadth: breadth,
            height: height,
            weight: weight,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken.mainToken}`,
            },
          }
        )
        .then(async function (response) {
          console.log("))))))))))))))))))))")
          console.log(response);
          console.log("))))))))))))))))))))")

          console.log(response.data.order_id);
          console.log(response.data.shipment_id);
          const { data: awb } = await axios.post(
            "http://localhost:8080/api/ship/generateAWB",
            {
              shipment_id: response.data.shipment_id,
            }
          );
          // console.log("awb",);
          if (awb.success) {
            const { data: pickUp } = await axios.post(
              "http://localhost:8080/api/ship/pickup",
              {
                shipment_id: response.data.shipment_id,
                // pickup_date: ,
              }
            );
            // console.log(pickUp,"pickup")
            if (pickUp.success) {
              const { data: manifest } = await axios.post(
                "http://localhost:8080/api/ship/manifest",
                {
                  shipment_id: response.data.shipment_id,
                }
              );
              if (manifest.success) {
                await orderModel.findOneAndUpdate(
                  { _id: order_id },
                  { manifest: manifest.data }
                );
                const { data: shipmentDetails } = await axios.post(
                  "http://localhost:8080/api/ship/shipDets",
                  {
                    shipment_id: response.data.shipment_id,
                  }
                );
                if (shipmentDetails.success) {
                  await orderModel.findOneAndUpdate(
                    { _id: order_id },
                    {
                      shipment_id: response.data.shipment_id,
                      awb: shipmentDetails.data.awb,
                      orderId: shipmentDetails.data.order_id,
                    }
                  );
                  const { data: invoice } = await axios.post(
                    "http://localhost:8080/api/ship/generateInvoice",
                    {
                      order_ids: shipmentDetails.data.order_id,
                    }
                  );
                  if (invoice.success) {
                    await orderModel.findOneAndUpdate(
                      { _id: order_id },
                      {
                        invoice: invoice.data,
                      }
                    );
                    res.json({
                      success: true,
                      message: "Order created successfully",
                    });
                  } else {
                    res.json({
                      success: false,
                      message: invoice.message,
                    });
                  }
                } else {
                  return res.json({
                    success: false,
                    message: shipmentDetails.message,
                  });
                }
              } else {
                return res.json({
                  success: false,
                  message: manifest.message,
                });
              }
            } else {
              return res.json({
                success: false,
                message: pickUp.message,
              });
            }
          } else {
            return res.status(400).send({
              success: false,
              message: awb.message,
            });
          }
        })
        .catch(function (error) {
          console.log("error in creating order error message as follows: ");
          console.log(error);
          return res.status(error.response.data.status_code).send({
            success: false,
            message: error.response.data.message,
          });
        });
    } else {
      console.log("token recieval from the srlogin function failed");
      return res.status(400).send({
        success: false,
        message: "Token recieval from the srlogin function failed",
      });
    }
  }
};


exports.getOrderDetsFunction=async(req,res)=> {
  let id = req.params.id;
console.log(id)
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  // console.log(getToken);

  const options = {
    method: "get",
    headers: {
      "Content-Type": "application/json", // Consider testing with and without this header
      Authorization: `Bearer ${getToken}`,
    },
    url: `https://apiv2.shiprocket.in/v1/external/orders/show/65dd887dd885d8807773db4a`,
  };

  try {
    console.log("cksujd")
    const response = await axios(options);
    console.log(response.data);
    // Handle the response data here
  } catch (error) {
    console.error("Error fetching order details:", error.response ? error.response.data : error.message);
    // Handle the error here, e.g., send a response back to the client
  }
}














//GET || getting details of an order using order_id
// exports.getOrderDetsFunction = async (req, res) => {
//   let id = req.params.id;
// console.log(id)
//   let getToken = await srlogin();
//   console.log("below is the api key token recieved");
//   // console.log(getToken);

//   if (getToken) {
//     console.log("JDJD JID")
//     let options = {
//       method: "get",
//       headers: {
//         "Content-Type": "application/json", // Consider removing if not required by the API
//         Authorization: `Bearer ${getToken.mainToken}`,
//       },
//       url: `https://apiv2.shiprocket.in/v1/external/orders/show/65dd8910d6db66b39dd233bc`,
//     };

//     await axios(options)
//       .then(function (response) {
//         console.log("data")
//         if (response == {}) {
//           res.send({
//             success: failure,
//             message: "No order found",
//           });
//         }
//         let orderDets = response.data.data;
//         console.log(orderDets);
//         res.status(200).send({
//           success: true,
//           message: "Order details are as follows: ",
//           data: orderDets,
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
// };

//POST || generating AWB for order mandatory for shipment pickup
exports.generateAWBFunction = async (req, res) => {
  let { shipment_id } = req.body;
  // console.log("generating AWB");

  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  let paramers = "shipment_id=" + shipment_id;
  console.log(shipment_id);
  if (getToken.status) {
    let options = {
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url:
        "https://apiv2.shiprocket.in/v1/external/courier/assign/awb?" +
        paramers,
    };
    await axios.request(options)
      .then(function (response) {
        // console.log("awwwwb",response)
        if(response.data.awb_assign_status !== 0){
          return res.json({
            success: true,
            message: "AWB generated successfully",
          });
        }else {
          return res.json({
            success: false,
            message: response.data.message,
          });
        }
       
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.data.status_code == 500 ||
          error.response.data.status_code == 502 ||
          error.response.data.status_code == 503 ||
          error.response.data.status_code == 504
        ) {
          res.status(500).send({
            message: "Server error at shiprocket missing data",
            status_code: error.response.data.status_code,
            error,
          });
        } else if (error.response.data.status_code == 401) {
          res.status(401).send({
            message: "Eroor in authenticating request error",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 404) {
          res.status(404).send({
            message: "Invaliv url access requested, check params",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 422) {
          res.status(422).send({
            message: "Unable to process params, check params",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 429) {
          res.status(429).send({
            message: "Rate limit exceeded",
            status_code: error.response.data.status_code,
          });
        } else {
          res.status(error.response.data.status_code).send({
            success: false,
            status_code: error.response.data.status_code,
            error,
          });
        }
      });
  } else {
    console.log("token recieval failed from the srlogin function");
  }
};

//POST || response is download url for invoice orders passed as array of ORDER_ids
exports.generateInvoiceFunction = async (req, res) => {
  // https://apiv2.shiprocket.in/v1/external/orders/print/invoice

  let { order_ids } = req.body;

  let getToken = await srlogin();
  console.log("below is the api key token recieved: ");
  console.log(getToken);

  if (getToken) {
    // let options = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${ getToken.mainToken }`,
    //   },
    //   url:
    //     "https://apiv2.shiprocket.in/v1/external/orders/print/invoice?" +
    //     paramers,
    // };

    await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/orders/print/invoice",
        {
          ids: [order_ids],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.mainToken}`,
          },
        }
      )
      .then(function (response) {
        let invoice_url = response.data.invoice_url;
        res.status(200).send({
          success: true,
          message: "Order invoice generated check here: ",
          data: invoice_url,
        });
      })
      .catch(function (error) {
        console.log(error);
        res.status(error.response.data.status).send({
          success: false,
          message: error.response.data.message,
        });
      });
  }
};

//POST || requesting pickup of a shipment
exports.setPickupFunction = async (req, res) => {
  console.log("Set pickup");
  let { shipment_id, pickup_date } = req.body;
  // let paramers = "shipment_id=" + shipment_id + "&pickup_date=" + pickup_date;

  let getToken = await srlogin();
  console.log("below is the api key token recieved: ");
  console.log(getToken);

  if (getToken) {
    // let options = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${ getToken.mainToken }`,
    //   },
    //   url:
    //     "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup?" +
    //     paramers,
    // };

    await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup",
        {
          shipment_id: shipment_id,
          // pickup_date: pickup_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.mainToken}`,
          },
        }
      )
      .then(function (response) {
        let data = response.data.response;
        console.log("response")
        console.log(response);
        if (response.data.pickup_status == 1) {
          return res.status(200).send({
            success: true,
            message:
              "Shipment pickup successfully set, following is the date: ",
            data: data,
          });
        } else {
          return res.json({
            success: false,
            message: "Shipment pickup not set",
          });
        }
      })
      .catch(function (error) {
        console.log("heelo error")
        console.log(error);
        res.status(error.response.data.status).send({
          success: false,
          message: error.response.data.message,
        });
      });
  }
};

//POST || generating manifest for shipment
exports.generateManifestFunction = async (req, res) => {
  console.log("generate manifest");
  let { shipment_id } = req.body;
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/manifests/generate",
        {
          shipment_id: shipment_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.mainToken}`,
          },
        }
      )
      .then(function (response) {
        let manifest_url = response.data.manifest_url;
        console.log(response);
        if (manifest_url === "") {
          return res.send({
            success: false,
            message: "Missing fields or invalid data",
          });
        }
        return res.status(200).send({
          success: true,
          message: "Manifest generated check here: ",
          data: manifest_url,
        });
      })
      .catch(function (error) {
        if (error.response.data.status_code === 400) {
          return res.status(400).send({
            success: false,
            message: "Manifest for the shipment already generated",
          });
        }
      });
  }
};

//GET || getting shipment details by shipment id
exports.shipmentDetsFunction = async (req, res) => {
  console.log("getting shipment details");
  let { shipment_id } = req.body;
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    let options = {
      method: "get",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url: "https://apiv2.shiprocket.in/v1/external/shipments/" + shipment_id,
    };

    await axios(options)
      .then(function (response) {
        if (response == {}) {
          return res.send({
            success: failure,
            message: "No shipment found",
          });
        }
        let shipDets = response.data.data;
        console.log(shipDets)
        return res.status(200).send({
          success: true,
          message: "Shipment details",
          data: shipDets,
        });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(error.response.data.status).send({
          success: false,
          message: error.response.data.message,
        });
      });
  }
};

//POST || cancelling shipment by shipment id
exports.cancelShipmentFunction = async (req, res) => {
  let { awbs } = req.body; //array of awbs
  if (awbs == []) {
    return res.status(404).send({
      success: false,
      message: "No AWBs were sent",
    });
  }
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/orders/cancel/shipment/awbs",
        { awbs: awbs },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.mainToken}`,
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        return res.status(200).send({
          success: true,
          message: response.data.message,
        });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(error.response.data.status).send({
          success: false,
          message: error.response.data.message,
        });
      });
  }
};

//POST || creating a return order
exports.createReturnOrderFunction = async (req, res) => {
  // const{ channel_id } =await axios.get("/ship/orderDets",{"order_id":order_id});

  const {
    // pickup_location,
    order_id,
    order_date,
    payment_method,
    channel_id,
    pickup_customer_name,
    pickup_last_name,
    pickup_address,
    pickup_address_2,
    pickup_city,
    pickup_pincode,
    pickup_state,
    pickup_country,
    pickup_email,
    pickup_phone,
    // pickup_alternate_phone,
    shipping_customer_name,
    shipping_last_name,
    shipping_address,
    shipping_address_2,
    shipping_city,
    shipping_pincode,
    shipping_country,
    shipping_state,
    shipping_email,
    shipping_phone,
    order_items, //array
    sub_total,
    total_discount,
    length,
    breadth,
    height,
    weight,
  } = req.body;

  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/orders/create/return",
        {
          order_id: order_id,
          order_date: order_date,
          channel_id: channel_id,
          pickup_customer_name: pickup_customer_name,
          pickup_last_name: pickup_last_name,
          pickup_address: pickup_address,
          pickup_address_2: pickup_address_2,
          pickup_city: pickup_city,
          pickup_state: pickup_state,
          pickup_country: pickup_country,
          pickup_pincode: pickup_pincode,
          pickup_email: pickup_email,
          pickup_phone: pickup_phone,
          shipping_customer_name: shipping_customer_name,
          shipping_last_name: shipping_last_name,
          shipping_address: shipping_address,
          shipping_address_2: shipping_address_2,
          shipping_city: shipping_city,
          shipping_country: shipping_country,
          shipping_pincode: shipping_pincode,
          shipping_state: shipping_state,
          shipping_email: shipping_email,
          shipping_phone: shipping_phone,
          order_items: order_items,
          payment_method: payment_method,
          total_discount: total_discount,
          sub_total: sub_total,
          length: length,
          breadth: breadth,
          height: height,
          weight: weight,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.mainToken}`,
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        if (response.status_code == 422) {
          return res.status(422).send({
            success: false,
            message: response.data.message,
          });
        }
        return res.status(200).send({
          success: true,
          message: response.data.status,
        });
      })
      .catch(function (error) {
        if (error.data.status_code == 400) {
          return res.status(400).send({
            success: false,
            message: error.response.data.message,
          });
        } else {
          console.log(error);
          return res.status(error.response.data.status_code).send({
            success: false,
            message: error.response.data.message,
          });
        }
      });
  }
};

//POST || generating AWB for return order mandatory for shipment pickup
exports.generateRetAWBFunction = async (req, res) => {
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);
  let { shipment_id, courier_id, status } = req.body;

  let paramers = "shipment_id=" + shipment_id;
  if (courier_id != null) {
    paramers += "&courier_id=" + courier_id;
  }
  if (status != "") {
    paramers += "&status=" + status;
  }
  paramers += "&is_return=" + 1;
  if (getToken.status) {
    let options = {
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url:
        "https://apiv2.shiprocket.in/v1/external/courier/assign/awb?" +
        paramers,
    };
    await axios(options)
      .then(function (response) {
        // console.log(response);
        return response;
      })
      .catch(function (error) {
        if (
          error.response.data.status_code == 500 ||
          error.response.data.status_code == 502 ||
          error.response.data.status_code == 503 ||
          error.response.data.status_code == 504
        ) {
          return res.status(500).send({
            message: "Server error at shiprocket missing data",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 401) {
          return res.status(401).send({
            message: "Eroor in authenticating request error",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 404) {
          return res.status(404).send({
            message: "Invaliv url access requested, check params",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 422) {
          return res.status(422).send({
            message: "Unable to process params, check params",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 429) {
          return res.status(429).send({
            message: "Rate limit exceeded",
            status_code: error.response.data.status_code,
          });
        } else {
          return res.status(500).send({
            success: false,
            status_code: error.response.data.status_code,
            error,
          });
        }
      });
  } else {
    console.log("token recieval failed from the srlogin function");
  }
};

//getToken Function ||Authentication via login and token recieval REQUIRED FOR ALL API CALLS
function srlogin() {
  // console.log(process.env.SHIPROCKET_EMAIL);
  return new Promise(async (resolve, reject) => {
    //DUMMY RESPONSE DATA, UPDATED ON RESPONSE RECIEVAL
    let resData = {
      status: false,
      mainToken: {},
      message: "Fail!!",
    };
    //REQUIRED DATA FOR AUTHENTICATION API
    var srlogindata = JSON.stringify({
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    });
    try {
      //REQUIRED OPTIONS FOR AUTHENTICATION API
      var options = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://apiv2.shiprocket.in/v1/external/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: srlogindata,
      };

      //CALLING LOGIN FOR GETTING TOKEN POST AUTHENTICATION
      axios(options)
        .then(function (response) {
          resData.status = true;
          resData.message = "Success!!";
          resData.mainToken = response.data.token;
          resolve(resData);
        })
        .catch(function (error) {
          console.error(error);
          reject(resData);
        });
    } catch (e) {
      console.error(e);
      res.send({
        success: false,
        message: e.response.message,
        status: e.response.data.status_code,
      });
    }
  });
}

