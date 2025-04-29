import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Admin login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      console.log("❌ Admin not found for email:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    /* console.log("🔍 Incoming password:", password);
    console.log("🔐 Stored hashed password:", admin.password); */

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("❌ Password mismatch for email:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ Admin login successful for:", email);
    res.json({ token, isAdmin: true });
  } catch (err) {
    console.error("❌ Server error during login:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
