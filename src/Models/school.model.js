import pool from "../DB/database.js";

class School {
  // Add a new school
  static async addSchool(schoolData) {
    try {
      const { name, address, latitude, longitude } = schoolData;

      const query = `
        INSERT INTO schools (name, address, latitude, longitude)
        VALUES (?, ?, ?, ?)
      `;

      const [result] = await pool.execute(query, [
        name,
        address,
        latitude,
        longitude,
      ]);

      return {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude,
        message: "School added successfully",
      };
    } catch (error) {
      throw new Error(`Failed to add school: ${error.message}`);
    }
  }

  // Get all schools sorted by proximity to user location
  static async getSchoolsByProximity(userLat, userLng) {
    try {
      // Calculate distance using Haversine formula
      const query = `
        SELECT 
          id,
          name,
          address,
          latitude,
          longitude,
          (
            6371 * acos(
              cos(radians(?)) * 
              cos(radians(latitude)) * 
              cos(radians(longitude) - radians(?)) + 
              sin(radians(?)) * 
              sin(radians(latitude))
            )
          ) AS distance
        FROM schools
        ORDER BY distance ASC
      `;

      const [rows] = await pool.execute(query, [userLat, userLng, userLat]);

      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        address: row.address,
        latitude: row.latitude,
        longitude: row.longitude,
        distance: Math.round(row.distance * 100) / 100, // Round to 2 decimal places
      }));
    } catch (error) {
      throw new Error(`Failed to fetch schools: ${error.message}`);
    }
  }

  // Get all schools (without distance calculation)
  static async getAllSchools() {
    try {
      const query =
        "SELECT id, name, address, latitude, longitude FROM schools ORDER BY name";
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch schools: ${error.message}`);
    }
  }

  // Get school by ID
  static async getSchoolById(id) {
    try {
      const query =
        "SELECT id, name, address, latitude, longitude FROM schools WHERE id = ?";
      const [rows] = await pool.execute(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch school: ${error.message}`);
    }
  }

  // Update school
  static async updateSchool(id, schoolData) {
    try {
      const { name, address, latitude, longitude } = schoolData;

      const query = `
        UPDATE schools 
        SET name = ?, address = ?, latitude = ?, longitude = ?
        WHERE id = ?
      `;

      const [result] = await pool.execute(query, [
        name,
        address,
        latitude,
        longitude,
        id,
      ]);

      if (result.affectedRows === 0) {
        throw new Error("School not found");
      }

      return {
        id,
        name,
        address,
        latitude,
        longitude,
        message: "School updated successfully",
      };
    } catch (error) {
      throw new Error(`Failed to update school: ${error.message}`);
    }
  }

  // Delete school
  static async deleteSchool(id) {
    try {
      const query = "DELETE FROM schools WHERE id = ?";
      const [result] = await pool.execute(query, [id]);

      if (result.affectedRows === 0) {
        throw new Error("School not found");
      }

      return { message: "School deleted successfully" };
    } catch (error) {
      throw new Error(`Failed to delete school: ${error.message}`);
    }
  }
}

export default School;
