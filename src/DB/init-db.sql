-- School Management Database Initialization Script
-- Run this script in your MySQL database to create the required tables

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Add indexes for better performance
  INDEX idx_coordinates (latitude, longitude),
  INDEX idx_name (name)
);

-- Insert sample data for testing
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Example School', '123 Main Street, City, State 12345', 40.7128, -74.0060),
('Downtown Academy', '456 Oak Avenue, Downtown, State 12345', 40.7589, -73.9851),
('Suburban High School', '789 Pine Street, Suburb, State 12345', 40.7505, -73.9934),
('Central Elementary', '321 Elm Street, Central, State 12345', 40.7450, -73.9900),
('Northside Middle School', '654 Maple Drive, Northside, State 12345', 40.7600, -73.9800);

-- Verify the table structure
DESCRIBE schools;

-- Show sample data
SELECT * FROM schools;

