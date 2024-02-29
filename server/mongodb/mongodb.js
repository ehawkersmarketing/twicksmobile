const mongoose = require('mongoose');

require('dotenv').config()

const mongodb = () =>{
    mongoose.connect(process.env.AUTH).then(()=>{
        console.log("Database connection established successfully")
    }).catch((err)=>{
            console.log("Error while connectiong with database")
            console.log(err)
            process.exit(1);
    })
}
module.exports = mongodb();