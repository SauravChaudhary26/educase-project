const db = require("../db.js");

// Function to calculate the distance between two points on the Earth's surface
function getDistance(lat1, lon1, lat2, lon2) {
   const toRad = (value) => (value * Math.PI) / 180;
   const R = 6371; // Earth’s radius in km
   const dLat = toRad(lat2 - lat1);
   const dLon = toRad(lon2 - lon1);
   const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
         Math.cos(toRad(lat2)) *
         Math.sin(dLon / 2) *
         Math.sin(dLon / 2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   return R * c;
}

const addSchool = (req, res) => {
   const { name, address, latitude, longitude } = req.body;

   // Simple validation: check that all fields are provided and of expected types
   if (!name || !address || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
         error: "All fields (name, address, latitude, longitude) are required.",
      });
   }

   // You can add further type checks if necessary (e.g., typeof latitude === 'number')

   const query =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
   db.query(query, [name, address, latitude, longitude], (err, result) => {
      if (err) {
         console.error("Error inserting school:", err);
         return res.status(500).json({ error: "Failed to add school" });
      }
      res.status(201).json({
         message: "School added successfully",
         schoolId: result.insertId,
      });
   });
};

const getSchool = (req, res) => {
   // Extract user location from query parameters
   const userLat = parseFloat(req.query.latitude);
   const userLon = parseFloat(req.query.longitude);

   if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({
         error: "Valid latitude and longitude are required as query parameters.",
      });
   }

   // Fetch all schools from the database
   const query = "SELECT * FROM schools";
   db.query(query, (err, results) => {
      if (err) {
         console.error("Error fetching schools:", err);
         return res.status(500).json({ error: "Failed to retrieve schools" });
      }

      // Calculate distance for each school and attach it to the school object
      const schoolsWithDistance = results.map((school) => {
         const distance = getDistance(
            userLat,
            userLon,
            school.latitude,
            school.longitude
         );
         return { ...school, distance };
      });

      // Sort schools by distance (closest first)
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);

      res.json({ schools: schoolsWithDistance });
   });
};

module.exports = { addSchool, getSchool };
