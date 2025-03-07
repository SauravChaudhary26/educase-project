const router = require("express").Router();
const { addSchool, getSchool } = require("../controllers/schoolController.js");

//Api to get all schools based on user locations
router.get("/listSchools", getSchool);
//Api to add a new school
router.post("/addSchool", addSchool);

module.exports = router;
