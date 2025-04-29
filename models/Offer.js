const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  title: String,
  description: String,
  cashbackPercent: Number,
  trackingUrl: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
