const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

// Run admin update script
require('./scripts/resetAdmin')(); // ✅ This will auto-run the script

const app = express();
app.use(cors());
app.use(express.json());

// Routes

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/stores', require('./routes/storeRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use("/api/admin", require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
