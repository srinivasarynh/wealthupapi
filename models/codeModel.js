const mongoose = require('mongoose');

// Define the schema for the code document
const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  used: {
    type: Boolean,
    default: false
  },
  validCode: {
    type: Boolean,
    default: true
  },
  expiry: {
    type: Date,
    default: () => new Date(Date.now() + 60 * 1000) // Set expiry to 60 seconds from now
  }
});

// Create a model from the schema
const Code = mongoose.model('Code', codeSchema);

module.exports = Code;
