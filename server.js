require("dotenv").config();
const express = require("express");
const app = express();
require("./db.js");
const schoolRouter = require("./routes/schoolRouter.js");
const pool = require("./db.js");

app.use(express.json()); // Middleware to parse JSON

// Endpoint: /addSchool
app.use("/", schoolRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
