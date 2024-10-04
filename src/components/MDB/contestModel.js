const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  name: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  url: { type: String, required: true },
});

const Contest = mongoose.model('Contest', contestSchema);

module.exports = Contest;