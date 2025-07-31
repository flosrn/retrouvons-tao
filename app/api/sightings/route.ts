import { NextRequest, NextResponse } from 'next/server'
import { createSightingReport, initializeDatabase } from '@/lib/db'
import { sendTelegramNotification, createFormSubmissionMessage } from '@/lib/sendTelegramNotification'

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
    
    // Send Telegram notification with detailed logging
    console.log('🚀 Starting Telegram notification process...')
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    
    console.log('📊 Environment variables check:')
    console.log('- TELEGRAM_BOT_TOKEN exists:', !!botToken, botToken ? '(length: ' + botToken.length + ')' : '(undefined)')
    console.log('- TELEGRAM_CHAT_ID exists:', !!chatId, chatId || '(undefined)')
    
    if (chatId && botToken) {
      console.log('✅ Both Telegram variables are present, proceeding with notification...')
      
      const telegramMessage = createFormSubmissionMessage({
        name: name.trim(),
        email: undefined, // No email field in the form
        phone: contact.trim(),
        location: location.trim(),
        description: message?.trim(),
        photoUrl: photoUrl,
        timestamp: new Date()
      })
      
      console.log('📝 Telegram message created (length: ' + telegramMessage.length + ' chars)')
      console.log('🎯 Attempting to send to chat ID:', chatId)
      
      try {
        // Send notification and wait for completion to catch errors
        const telegramResult = await sendTelegramNotification(chatId, telegramMessage)
        if (telegramResult) {
          console.log('✅ Telegram notification sent successfully!')
        } else {
          console.error('❌ Telegram notification failed (returned false)')
        }
      } catch (error) {
        console.error('❌ Failed to send Telegram notification:', error)
        console.error('Error details:', {
          name: (error as any)?.name,
          message: (error as any)?.message,
          stack: (error as any)?.stack
        })
      }
    } else {
      console.warn('⚠️ Telegram notification skipped - missing variables:')
      console.warn('- BOT_TOKEN missing:', !botToken)
      console.warn('- CHAT_ID missing:', !chatId)
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Signalement enregistré avec succès',
      id: sightingReport.id
    }, { status: 201 })
    
  } catch (error) {
    console.error('❌ Error processing sighting report:', error)
    console.error('Error details:', {
      name: (error as any)?.name,
      message: (error as any)?.message,
      stack: (error as any)?.stack
    })
    
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