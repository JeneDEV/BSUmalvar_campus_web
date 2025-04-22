const express = require("express");
const router = express.Router();
const connection = require("../config/dbconnection"); // Ensure this is correct

// Admin Login Route
router.post("/admin_login", (req, res) => {
    const { email, password } = req.body;
    
    const query = "SELECT * FROM admin WHERE email = ? AND password = ?";
    
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
            req.session.user = results[0]; // Store user session
            console.log("Login successful for:", email);
            res.json({ success: true, message: "Login successful" });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    });
});

// Logout Route (Redirect version)
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Logout failed");
        res.redirect("/pages/admin_login.html"); // Redirect after logout
    });
});

module.exports = router;
