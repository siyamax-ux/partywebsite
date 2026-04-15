const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  image: { type: String, required: true }, // Store filename/path
  totalMembers: { type: Number, default: 1 },
  registrationId: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
