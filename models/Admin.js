const dotenv = require("dotenv");
const { resetAdmin } = require("../models/adminModel");

dotenv.config();

const run = async () => {
  try {
    const email = "paykaro@example.com";
    const password = "newsecurepassword";

    await resetAdmin(email, password);

    console.log("✅ Admin reset successful.");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (err) {
    console.error("❌ Error resetting admin:", err.message);
  }
};

if (require.main === module) {
  run().then(() => process.exit());
} else {
  module.exports = run;
}
