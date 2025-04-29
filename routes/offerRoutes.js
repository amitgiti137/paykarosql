const express = require('express');
const router = express.Router();
const { createOffer, getOffers } = require('../controllers/offerController');
const adminAuth = require('../middleware/adminAuth');
const upload = require('../utils/multer');

router.post('/admin/add-offer', adminAuth, upload.single('image'), createOffer);
router.get('/', getOffers);

module.exports = router;
