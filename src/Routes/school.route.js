import express from "express";
import SchoolController from "../Controller/school.controller.js";

const router = express.Router();

// POST /addSchool - Add a new school
router.post("/addSchool", SchoolController.addSchool);

// GET /listSchools - Get schools sorted by proximity to user location
router.get("/listSchools", SchoolController.getSchoolsByProximity);

export default router;