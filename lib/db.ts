import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set')
}

const sql = neon(process.env.DATABASE_URL)

export { sql }

// Database schema types
export interface SightingReport {
  id: number
  name: string
  contact: string
  location: string
  message?: string
  photo_filename?: string
  photo_url?: string
  created_at: Date
  status: 'new' | 'verified' | 'false_positive'
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    // Create the sighting_reports table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS sighting_reports (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        contact VARCHAR(255) NOT NULL,
        location TEXT NOT NULL,
        message TEXT,
        photo_filename VARCHAR(255),
        photo_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'new'
      )
    `
    
    console.log('Database initialized successfully')
    return true
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

// Insert a new sighting report
export async function createSightingReport(data: {
  name: string
  contact: string
  location: string
  message?: string
  photo_url: string // Now required from UploadThing
  photo_filename?: string
}) {
  try {
    const result = await sql`
      INSERT INTO sighting_reports (name, contact, location, message, photo_filename, photo_url)
      VALUES (${data.name}, ${data.contact}, ${data.location}, ${data.message || null}, ${data.photo_filename || null}, ${data.photo_url})
      RETURNING *
    `
    
    return result[0] as SightingReport
  } catch (error) {
    console.error('Error creating sighting report:', error)
    throw error
  }
}

// Get all sighting reports (for admin purposes)
export async function getAllSightingReports() {
  try {
    const result = await sql`
      SELECT * FROM sighting_reports 
      ORDER BY created_at DESC
    `
    
    return result as SightingReport[]
  } catch (error) {
    console.error('Error fetching sighting reports:', error)
    throw error
  }
}

// Get sighting report by ID
export async function getSightingReportById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM sighting_reports 
      WHERE id = ${id}
    `
    
    return result[0] as SightingReport | undefined
  } catch (error) {
    console.error('Error fetching sighting report by ID:', error)
    throw error
  }
}

// Update sighting report status
export async function updateSightingReportStatus(id: number, status: 'new' | 'verified' | 'false_positive') {
  try {
    const result = await sql`
      UPDATE sighting_reports 
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *
    `
    
    return result[0] as SightingReport | undefined
  } catch (error) {
    console.error('Error updating sighting report status:', error)
    throw error
  }
}