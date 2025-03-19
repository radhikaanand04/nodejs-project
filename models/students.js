const mongoose = require('mongoose');
const studentschema = new mongoose.Schema(
    {
        name:{
            type : "String",
            required : "true"
        },
        age:{
            type : "Number",
            required : "true",
            min : "17"
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        gender : {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
        },
        courses : [{
            type: String
        }],
        gpa : {
            type : Number,
            min : 6.0,
            max : 10.0
        }
     },
     {
     timestamps : true
     }
);
const Student = mongoose.model("Student",studentschema);
module.exports = Student;