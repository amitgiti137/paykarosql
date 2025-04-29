// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

router.post("/", createCategory);  // POST /api/categories
router.get("/", getCategories);    // GET /api/categories

module.exports = router;
