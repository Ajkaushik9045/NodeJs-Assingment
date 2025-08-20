import School from "../Models/school.model.js";

class SchoolController {
  // Add a new school
  static async addSchool(req, res) {
    try {
      const { name, address, latitude, longitude } = req.body;

      // Validation
      if (
        !name ||
        !address ||
        latitude === undefined ||
        longitude === undefined
      ) {
        return res.status(400).json({
          status: "error",
          message:
            "All fields (name, address, latitude, longitude) are required",
        });
      }

      // Validate latitude range (-90 to 90)
      if (latitude < -90 || latitude > 90) {
        return res.status(400).json({
          status: "error",
          message: "Latitude must be between -90 and 90 degrees",
        });
      }

      // Validate longitude range (-180 to 180)
      if (longitude < -180 || longitude > 180) {
        return res.status(400).json({
          status: "error",
          message: "Longitude must be between -180 and 180 degrees",
        });
      }

      // Validate data types
      if (typeof name !== "string" || typeof address !== "string") {
        return res.status(400).json({
          status: "error",
          message: "Name and address must be strings",
        });
      }

      if (typeof latitude !== "number" || typeof longitude !== "number") {
        return res.status(400).json({
          status: "error",
          message: "Latitude and longitude must be numbers",
        });
      }

      // Check if school with same coordinates already exists
      const existingSchools = await School.getAllSchools();
      const duplicateSchool = existingSchools.find(
        (school) =>
          school.latitude === latitude && school.longitude === longitude
      );

      if (duplicateSchool) {
        return res.status(409).json({
          status: "error",
          message: "A school already exists at these coordinates",
        });
      }

      const newSchool = await School.addSchool({
        name,
        address,
        latitude,
        longitude,
      });

      res.status(201).json({
        status: "success",
        message: "School added successfully",
        data: newSchool,
      });
    } catch (error) {
      console.error("Add school error:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to add school",
        error: error.message,
      });
    }
  }

  // Get schools sorted by proximity to user location
  static async getSchoolsByProximity(req, res) {
    try {
      const { latitude, longitude } = req.query;

      // Validation
      if (!latitude || !longitude) {
        return res.status(400).json({
          status: "error",
          message: "Both latitude and longitude query parameters are required",
        });
      }

      // Validate latitude range (-90 to 90)
      const lat = parseFloat(latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        return res.status(400).json({
          status: "error",
          message: "Latitude must be a valid number between -90 and 90 degrees",
        });
      }

      // Validate longitude range (-180 to 180)
      const lng = parseFloat(longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        return res.status(400).json({
          status: "error",
          message:
            "Longitude must be a valid number between -180 and 180 degrees",
        });
      }

      const schools = await School.getSchoolsByProximity(lat, lng);

      res.status(200).json({
        status: "success",
        message: "Schools retrieved successfully",
        data: {
          userLocation: { latitude: lat, longitude: lng },
          schools: schools,
          totalSchools: schools.length,
        },
      });
    } catch (error) {
      console.error("Get schools by proximity error:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve schools",
        error: error.message,
      });
    }
  }
}

export default SchoolController;
