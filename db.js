const mysql = require("mysql2");

// Set up MySQL connection
const db = mysql.createConnection({
   host: "localhost", // Adjust if needed
   user: "root", // Replace with your MySQL username
   password: "saurav@mysql", // Replace with your MySQL password
   database: "school_db",
});

db.connect((err) => {
   if (err) {
      console.error("Database connection failed:", err);
   } else {
      console.log("Connected to MySQL database.");
   }
});

module.exports = db;
