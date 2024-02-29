const serviceModel = require('../../models/serviceModel/serviceModel')

exports.createService = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
    } = req.body;

    const service = await serviceModel.create({
      title,
      description,
      image: `${image}`,
    });

    await service.save();
    if (service) {
      res.json({
        status: 200,
        success: true,
        data: { service },
        messsage: "Service Created successfully",
      });
    } else {
      res.json({
        success: false,
        messsage: "Service Creation failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while creating a service",
    });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.find({});
    if (!services) {
      return res.status(500).send({
        success: false,
        message: "No service found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All service list",
      data: services,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all servcie",
      error,
    });
  }
};

exports.getServicesById = async (req, res) => {
  try {
    const services = await serviceModel.find({ _id: req.params.id });
    // console.log(services);
    if (!services) {
      return res.status(500).send({
        success: false,
        message: "No service found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All service list",
      data: services,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all service",
      error,
    });
  }
};

exports.searchServices = async (req, res) => {
  try {
    const services = await serviceModel.find({});
    let searchRes = [];
    for (let i = 0; i < services.length; i++) {
      if (services[i].title.toLowerCase().includes(req.body.search.toLowerCase()) || services[i].description.toLowerCase().includes(req.body.search.toLowerCase())) {
        searchRes.push(services[i]);
      }
    }
    // if (searchRes.length == 0) {
    //   return res.status(500).send({
    //     success: false,
    //     message: "No service found",
    //   });
    // }
    return res.status(200).send({
      success: true,
      message: "All service list",
      data: searchRes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all service",
      error,
    });
  }
};


exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image,
    } = req.body;

    const updatedService = await serviceModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        image
      }
    );


    res.status(200).json({
      success: true,
      data: updatedService,
      message: "Service Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: error,
      message: "Error while updating the service",
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const service = await serviceModel.findByIdAndDelete(id);
    if (service) {
      return res.status(200).send({
        success: true,
        message: "service deleted!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting service",
      error,
    });
  }
};
