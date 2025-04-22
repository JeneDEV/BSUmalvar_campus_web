const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
    host: "localhost",   // Change if needed
    user: "root",        // Your MySQL username
    password: "",        // Your MySQL password
    database: "bsu_deptsys" // Replace with your actual database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("✅ Connected to MySQL database");
    }
});

module.exports = db; // Export the connection for use in other files
