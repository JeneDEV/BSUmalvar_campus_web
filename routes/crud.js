const express = require("express");
const router = express.Router();
const db = require("../config/dbconnection");  // Import DB Connection

// ✅ API Route to Fetch Departments
router.get("/departments", (req, res) => {
    const sql = "SELECT * FROM tbl_dept";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results); // Send MySQL data as JSON
    });
});

module.exports = router;
