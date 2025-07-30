import { NextRequest, NextResponse } from 'next/server'
import { createSightingReport, initializeDatabase } from '@/lib/db'

// Initialize database on startup
let dbInitialized = false

async function ensureDatabaseInitialized() {
  if (!dbInitialized) {
    await initializeDatabase()
    dbInitialized = true
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure database is initialized
    await ensureDatabaseInitialized()
    
    // Parse the JSON data
    const data = await request.json()
    
    // Extract form fields
    const { name, contact, location, message, photoUrl, photoName } = data
    
    // Validate required fields
    if (!name || !contact || !location) {
      return NextResponse.json(
        { error: 'Les champs nom, contact et localisation sont obligatoires' },
        { status: 400 }
      )
    }
    
    // Photo URL is required (from UploadThing)
    if (!photoUrl) {
      return NextResponse.json(
        { error: 'Une photo est obligatoire pour valider le signalement' },
        { status: 400 }
      )
    }
    
    // Create sighting report in database
    const sightingReport = await createSightingReport({
      name: name.trim(),
      contact: contact.trim(),
      location: location.trim(),
      message: message?.trim() || undefined,
      photo_filename: photoName || undefined,
      photo_url: photoUrl
    })
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Signalement enregistré avec succès',
      id: sightingReport.id
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error processing sighting report:', error)
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve all sightings (for admin purposes)
export async function GET() {
  try {
    await ensureDatabaseInitialized()
    const { getAllSightingReports } = await import('@/lib/db')
    const sightings = await getAllSightingReports()
    
    return NextResponse.json({ sightings })
  } catch (error) {
    console.error('Error in GET /api/sightings:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}