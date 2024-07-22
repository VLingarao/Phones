const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BikeSchema = new mongoose.Schema({
     
     bikename : {
          type : String,
          require : true
     },
     bikeprice : {
          type : Number,
          require : true
     },
     bikecolor : {
          type : String,
          require : true
     }
})

module.exports = mongoose.model("BikeDataBase",BikeSchema)