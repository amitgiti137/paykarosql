const express = require('express');
const router = express.Router();
const { createStore, getStores, getStoreByName, updateStoreByName, getStoreCategoryCashbacks, addCategoryCashback, updateCategoryCashback } = require('../controllers/storeController');
const adminAuth = require('../middleware/adminAuth')


// public api
router.get('/', getStores);

router.post('/', adminAuth, createStore);
router.get('/admin/store/by-name/:store_name', adminAuth, getStoreByName);
router.put('/admin/store/by-name/:store_name', adminAuth, updateStoreByName);

router.get('/:storeId/category-cashbacks', adminAuth, getStoreCategoryCashbacks);
router.post('/:storeId/add-category-cashback', adminAuth, addCategoryCashback);
router.put('/:storeId/update-category-cashback/:categoryId', adminAuth, updateCategoryCashback);

module.exports = router;
