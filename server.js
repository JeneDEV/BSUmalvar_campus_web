const express = require("express");
const path = require("path");
const crud = require("./routes/crud");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static files from the root directory
app.use(express.static(__dirname));
app.use("/routes/crud", crud);



// Serve index.html by default
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "pages", "index.html")));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
