const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  store_name: { type: String, required: true, unique: true }, // ✅ Add this line
  logo: String,
  offerImage: String,
  description: String,

  // Main product/category URL
  baseUrl: { type: String, required: true },

  // Affiliate-related
  affiliateTag: String,                // e.g., growthte
  affiliateParams: mongoose.Schema.Types.Mixed,  // e.g., { affExtParam1: "XYZ", affExtParam2: "CK" }

  // Optional: Full campaign or UTM-related details
  campaign: {
    cid: String,                       // Campaign ID
    sid: String,                       // Category or Sub ID
    otracker: String,
    otracker1: String,
    fm: String,
    marketplace: String,
    iid: String
  },

  // Optional: store-specific filters like discount ranges
  filters: mongoose.Schema.Types.Mixed, // e.g., { discount_range: ["40% or more", "20% or more"] }

  cashback: {
    value: { type: Number, default: 0 },  // e.g., 10
    type: { type: String, enum: ['percent', 'flat'], default: 'percent' }, // e.g., 'percent' or 'flat'
    maxCashback: { type: String }
  },

  /* uptoCashback: {
    value: { type: Number, default: 0 },
    type: { type: String, enum: ['percent', 'flat'], default: 'percent' },
  }, */
  // ✅ category-level cashback per store
  categoryCashbacks: [
    {
      category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
      cashback: {
        value: { type: Number, required: true },
        type: { type: String, enum: ['percent', 'flat'], default: 'percent' },
      },
      maxCashback: { type: String },
      categoryCashbackText: { type: String } // optional
    }
  ],

}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);
