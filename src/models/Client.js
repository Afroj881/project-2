const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
