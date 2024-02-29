const express = require("express");
const {
  putProductInCart,
  deleteProductInCart,
  getCartByUser,
  getAllProductsInCart,
} = require("../../controlllers/cart/cartController");
const {
  AdminRole,
  EditorRole,
  ViewerRole,
} = require("../../middleware/role_check");
const router = express.Router();

//PUT || add product route
router.put("/addToCart", putProductInCart);

//DELETE || delete product route
router.delete("/dropFromCart/:userId/:productId", deleteProductInCart);
router.get("/getCartByUser/:userId", getCartByUser);
router.get("/getProductsInCart/:userId", getAllProductsInCart);
module.exports = router;
