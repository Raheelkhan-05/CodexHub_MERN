const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  acceptance: { type: String, required: true },
  difficulty: { type: String, required: true },
  solved: { type: Boolean, required: true },
  url: { type: String, required: true },
});

const Practice = mongoose.model('Practice', practiceSchema);

module.exports = Practice;