const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  wallet: { type: Number, default: 0 },
  referralCode: { type: String, unique: true },
  referredBy: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
