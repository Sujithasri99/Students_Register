const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const studentSchema = new Schema({
    name : String,
    age : Number,
    address: String,
    email: String
});

module.exports = mongoose.model("Student", studentSchema);
