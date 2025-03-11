const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema({
  file: { type: String, required: true }, // Store file path or URL
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Circular', circularSchema);
