import dotenv from 'dotenv';
import { testConnection, initializeDatabase } from './src/DB/database.js';

// Load environment variables
dotenv.config();

async function startup() {
  console.log('🚀 Starting School Management API...\n');

  try {
    // Test database connection
    console.log('📡 Testing database connection...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Database connection failed. Please check your configuration.');
      console.log('💡 Make sure to:');
      console.log('   1. Create a MySQL database named "school_management"');
      console.log('   2. Set correct database credentials in .env file');
      console.log('   3. Ensure MySQL service is running');
      process.exit(1);
    }

    // Initialize database tables
    console.log('🗄️  Initializing database tables...');
    const isInitialized = await initializeDatabase();
    
    if (!isInitialized) {
      console.error('❌ Database initialization failed.');
      process.exit(1);
    }

    console.log('✅ Database setup completed successfully!\n');
    
    // Import and start the main application
    console.log('🌐 Starting Express server...');
    const app = await import('./index.js');
  } catch (error) {
    console.error('❌ Startup failed:', error.message);
    process.exit(1);
  }
}

// Run startup
startup();

