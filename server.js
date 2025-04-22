const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const crud = require("./routes/crud");
const connection = require("./config/dbconnection");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const session = require("express-session");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(express.static("pages")); // So you can still load pages like /pages/admin_login.html

// Session Middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use true only in production with HTTPS
  })
);

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/pages/admin_login.html");
  }
};

// Route: Protected admin panel
app.get("/admin_panel", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "protected/admin_panel.html"));
});

// Block direct access to /public/uploads
app.use(
  express.static("public", {
    setHeaders: (res, filePath) => {
      if (filePath.includes("/public/uploads/")) {
        res.status(403).end("Forbidden");
      }
    },
  })
);



  
// Routes
app.use("/api", crud);
app.use("/auth", authRoutes);

// Default route
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "index.html"))
);

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
