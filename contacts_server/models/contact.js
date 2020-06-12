const mongoose   = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String
});

module.exports = mongoose.model("Contact", contactSchema);