const productModel = require("../../models/productModel/productModel.js");
const categoryModel = require("../../models/categoryModel/categoryModel.js");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).populate('category');
    // console.log(products)
    if (!products) {
      return res.status(500).send({
        success: false,
        message: "No products found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const products = await productModel.findOne({ _id: req.params.id }).populate('category');
    // console.log(products);
    if (!products) {
      return res.status(500).send({
        success: false,
        message: "No products found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      image,
      quantity,
      rating,
      units,
      metric,
      companyName,
      category,
      weight
    } = req.body;

    const product = await productModel.create({
      title,
      description,
      image: `${image}`,
      price,
      quantity,
      units,
      rating,
      metric,
      companyName,
      category,
      weight
    });

    const categoryData = await categoryModel.find({ category });

    await product.save();
    if (product) {
      res.json({
        status: 200,
        success: true,
        data: { product, category },
        messsage: "Product Created successfully",
      });
    } else {
      res.json({
        success: false,
        messsage: "Product Creation failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while creating a product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image,
      price,
      weight,
      quantity,
      metric,
      companyName,
      category,
      
    } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        image,
        price,
        weight,
        quantity,
        metric,
        companyName,
        category,
        
      }
    );

    // console.log(updatedProduct)

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: error,
      message: "Error while updating the product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image,
      price,
      quantity,
      metric,
      companyName,
      productType,
    } = req.body;
    const deletedProduct = await productModel.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: error,
      message: "Error fetched while deleting the product",
    });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    let { search } = req.body;
    search = search.trim();
    let products = await productModel.find({}).populate('category');
    let searchProducts = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.category.toLowerCase().includes(search.toLowerCase()) || products[i].title.toLowerCase().includes(search.toLowerCase()) || products[i].description.toLowerCase().includes(search.toLowerCase())) {
        searchProducts.push(products[i]);
      }
    }
    if (searchProducts.length < 0) {
      return res.status(500).send({
        success: false,
        message: "No products found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      data: searchProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};

exports.searchProductByCategory = async (req, res) => {
  try {
    const search = req.params.category;
    const products = await productModel.find({ category: search }).populate('category');
    if (!products) {
      return res.status(500).send({
        success: false,
        message: "No products found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};

exports.CreateCategory = async (req, res) => {
  try {
    const { category, categoryImg } = req.body;

    const response = await categoryModel.create({
      category,
      categoryImg
    });

    const productType = await response.save();
    res.json({
      status: 200,
      success: true,
      data: productType,
      messsage: "Category Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while creating a category",
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    // console.log(category);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No category found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All category list",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all category",
      error,
    });
  }
};
