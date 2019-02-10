var mongoose = require("mongoose");

userSchema  = new mongoose.Schema({
    password : String,
    name : String,
    email : String,
    dateOfBirth : String,
    time : String,
    reset_password_token: String,
    reset_password_expires: Date

});


module.exports = mongoose.model("User", userSchema);