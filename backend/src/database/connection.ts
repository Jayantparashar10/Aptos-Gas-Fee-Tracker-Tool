import { Pool } from 'pg';

// Create PostgreSQL connection pool for Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Supabase specific settings
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
});

export { pool };

// Test database connection
export async function testDbConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW() as current_time, version() as pg_version');
    client.release();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Helper function to check if gas_prices table exists
export async function checkTableExists(): Promise<boolean> {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'gas_prices'
      );
    `);
    client.release();
    return result.rows[0].exists;
  } catch (error) {
    console.error('Error checking table existence:', error);
    return false;
  }
}

// Helper function to get database info
export async function getDatabaseInfo() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT 
        current_database() as database_name,
        current_user as current_user,
        version() as postgres_version,
        now() as current_time
    `);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error getting database info:', error);
    return null;
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('Database pool has ended');
    process.exit(0);
  });
});
