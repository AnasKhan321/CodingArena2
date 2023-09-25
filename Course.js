const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  IName: {
    type: String,
    required: true,
  },
  CourseT: {
    type: String,
    required: true,
  },
  CourseD: {
    type: String,
    required: true,
  },
  imageurl : {
    type: String, 
    required : true
  },
  Price : {
    type : Number , 
    required : true 
  },
  Notes : {
    type : String , 
    default : ""
  },
  Students : {
    type: Number , 
    default : 0 
  },
  Rating : {
    type : Number, 
    default : 5 , 
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Course = mongoose.model("Course", CourseSchema);

module.exports = Course; 