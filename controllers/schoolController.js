import pool from "../db.js"; // Importing the database connection

// Function to calculate the distance between two geographic coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
   const toRad = (value) => (value * Math.PI) / 180;
   const R = 6371; // Earth's radius in km
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
};

// Function to add a school to the database
export const addSchool = async (req, res) => {
   try {
      const { name, address, latitude, longitude } = req.body;

      // Validation: Ensure all fields are provided
      if (
         !name ||
         !address ||
         latitude === undefined ||
         longitude === undefined
      ) {
         return res.status(400).json({
            error: "All fields (name, address, latitude, longitude) are required.",
         });
      }

      const query =
         "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
      const [result] = await pool.execute(query, [
         name,
         address,
         latitude,
         longitude,
      ]);

      res.status(201).json({
         message: "School added successfully",
         schoolId: result.insertId,
      });
   } catch (err) {
      console.error("Error inserting school:", err);
      res.status(500).json({ error: "Failed to add school" });
   }
};

// Function to get a list of schools sorted by proximity to the user's location
export const getSchool = async (req, res) => {
   try {
      const userLat = parseFloat(req.query.latitude);
      const userLon = parseFloat(req.query.longitude);

      if (isNaN(userLat) || isNaN(userLon)) {
         return res.status(400).json({
            error: "Valid latitude and longitude are required as query parameters.",
         });
      }

      const query = "SELECT * FROM schools";
      const [results] = await pool.execute(query); // Using async/await for MySQL query

      const schoolsWithDistance = results.map((school) => ({
         ...school,
         distance: getDistance(
            userLat,
            userLon,
            school.latitude,
            school.longitude
         ),
      }));

      // Sort schools by proximity (nearest first)
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);

      res.json({ schools: schoolsWithDistance });
   } catch (err) {
      console.error("Error fetching schools:", err);
      res.status(500).json({ error: "Failed to retrieve schools" });
   }
};
