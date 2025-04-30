// controllers/storeController.js (MySQL version)

const Store = require('../models/Store');
const CategoryCashback = require('../models/Category');
const formatCashback = require('../utils/formatCashback');

// ✅ Create Store with categoryCashbacks
exports.createStore = async (req, res) => {
  try {
    const storeId = await Store.createStore(req.body);

    // Handle optional category-level cashbacks
    const categoryCashbacks = req.body.categoryCashbacks || [];
    for (const cb of categoryCashbacks) {
      await CategoryCashback.addCategoryCashback(storeId, {
        categoryId: cb.category,
        cashback: cb.cashback,
        maxCashback: cb.maxCashback
      });
    }

    res.status(201).json({ message: "Store created", storeId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all stores with cashbackText & pageLink
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.getStores();

    const formatted = stores.map(store => ({
      ...store,
      pageLink: `${store.store_name.toLowerCase().replace(/\s+/g, '-')}-coupon`,
      cashbackText: formatCashback(
        { value: store.cashback_value, type: store.cashback_type },
        store.cashback_max
      )
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stores" });
  }
};

// ✅ Get store by store_name
exports.getStoreByName = async (req, res) => {
  try {
    const store = await Store.getStoreByName(req.params.store_name);
    if (!store) return res.status(404).json({ error: "Store not found" });
    res.status(200).json(store);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch store" });
  }
};

// ✅ Update store by store_name
exports.updateStoreByName = async (req, res) => {
  try {
    const updated = await Store.updateStoreByName(req.params.store_name, req.body);
    if (!updated) return res.status(404).json({ error: "Store not found" });

    const store = await Store.getStoreByName(req.params.store_name);
    res.status(200).json({ message: "Store updated", store });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all category cashback entries for a store
exports.getStoreCategoryCashbacks = async (req, res) => {
  try {
    const data = await CategoryCashback.getCashbacksByStoreId(req.params.storeId);

    const formatted = data.map(cb => ({
      ...cb,
      categoryCashbackText: formatCashback(cb.cashback, cb.maxCashback)
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cashback info" });
  }
};

// ✅ Add or update a category-level cashback
exports.addCategoryCashback = async (req, res) => {
  const { categoryId, cashback, maxCashback } = req.body;

  try {
    const updated = await CategoryCashback.addCategoryCashback(req.params.storeId, {
      categoryId,
      cashback,
      maxCashback
    });

    const result = await CategoryCashback.getCashbacksByStoreId(req.params.storeId);
    res.status(200).json({ message: "Category cashback updated", categoryCashbacks: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Update a category cashback
exports.updateCategoryCashback = async (req, res) => {
  const { cashback, maxCashback } = req.body;

  try {
    const updated = await CategoryCashback.updateCategoryCashback(
      req.params.storeId,
      req.params.categoryId,
      { cashback, maxCashback }
    );

    if (!updated) return res.status(404).json({ error: "Category cashback not found" });

    const result = await CategoryCashback.getCashbacksByStoreId(req.params.storeId);
    res.status(200).json({ message: "Cashback updated", categoryCashbacks: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
