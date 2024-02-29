const {
  calcShipment,
  createOrder,
  generateAWBFunction,
  setPickupFunction,
  generateManifestFunction,
  shipmentDetsFunction,
  cancelShipmentFunction,
  createReturnOrderFunction,
  generateRetAWBFunction,
  generateInvoiceFunction,
  getOrderDetsFunction,
  requestApproval,
  approveRequest,
  cancelApprovalRequest,
} = require("../../controlllers/ship/shipController");

const express = require("express");

const router = express.Router();

router.post("/requestApproval", requestApproval);

router.post("/approveRequest", approveRequest);
router.post("/cancelRequest", cancelApprovalRequest);

router.post("/calcShipment", calcShipment);

router.post("/createOrder", createOrder);

router.post("/generateAWB", generateAWBFunction);

router.post("/pickup", setPickupFunction);

router.post("/manifest", generateManifestFunction);

router.post("/shipDets", shipmentDetsFunction);

router.post("/cancelShip", cancelShipmentFunction);

router.post("/createRet", createReturnOrderFunction);

router.post("/generateRetAWB", generateRetAWBFunction);

router.post("/generateInvoice", generateInvoiceFunction);

router.get("/orderDets/:id", getOrderDetsFunction);

module.exports = router;
