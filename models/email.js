const mongoose = require('mongoose');

emailSchema = new mongoose.Schema({
   email : String
});

module.exports = mongoose.model("Email", emailSchema);
