const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");

dotenv.config();

const resetAdmin = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    const email = "paykaro@example.com";
    const password = "newsecurepassword"; // Plain password

    // Delete all existing admins
    const deleted = await Admin.deleteMany({});
    console.log(`🗑️ Deleted ${deleted.deletedCount} existing admin(s)`);

    // Create new admin — plain password is fine here, schema will hash it
    const admin = new Admin({
      email: email.toLowerCase(),
      password, // plain text
    });

    await admin.save();
    /* console.log(`✅ New admin created with email: ${email}`);
    console.log(`🔐 Password used (plain): ${password}`); */
  } catch (err) {
    console.error("❌ Error:", err.message);
  } /* finally {
    process.exit();
  } */
};


// 🔁 Only exit if run directly from CLI
if (require.main === module) {
  resetAdmin().then(() => process.exit());
} else {
  module.exports = resetAdmin;
}
/* run(); */
