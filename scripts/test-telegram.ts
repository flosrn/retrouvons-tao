#!/usr/bin/env tsx

/**
 * Test script for Telegram bot functionality
 * 
 * Usage:
 * 1. Send a message to your TaoFinderBot on Telegram
 * 2. Run: npx tsx scripts/test-telegram.ts get-updates
 * 3. Copy your chat_id from the response
 * 4. Add TELEGRAM_CHAT_ID to your .env.local file
 * 5. Run: npx tsx scripts/test-telegram.ts send-test
 */

import { sendTelegramNotification, createFormSubmissionMessage } from '../lib/sendTelegramNotification'

const botToken = process.env.TELEGRAM_BOT_TOKEN || '8370391423:AAGxB0lnT_TwLHyUbuCKGDHKWtqArLuN_Nw'

async function getUpdates() {
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`)
    const data = await response.json()
    
    if (data.ok && data.result.length > 0) {
      console.log('📱 Recent messages:')
      data.result.forEach((update: any, index: number) => {
        const message = update.message
        if (message) {
          console.log(`\n${index + 1}. Message from ${message.from.first_name}:`)
          console.log(`   Chat ID: ${message.chat.id}`)
          console.log(`   Username: @${message.from.username || 'N/A'}`)
          console.log(`   Text: "${message.text}"`)
          console.log(`   Date: ${new Date(message.date * 1000).toLocaleString()}`)
        }
      })
      
      const lastMessage = data.result[data.result.length - 1].message
      if (lastMessage) {
        console.log(`\n🎯 Your chat ID is: ${lastMessage.chat.id}`)
        console.log(`\n📝 Add this to your .env.local file:`)
        console.log(`TELEGRAM_CHAT_ID=${lastMessage.chat.id}`)
      }
    } else {
      console.log('❌ No messages found. Please send a message to your bot first!')
    }
  } catch (error) {
    console.error('❌ Error getting updates:', error)
  }
}

async function sendTestMessage() {
  const chatId = process.env.TELEGRAM_CHAT_ID
  
  if (!chatId) {
    console.log('❌ TELEGRAM_CHAT_ID not found in environment variables')
    console.log('📝 Add TELEGRAM_CHAT_ID to your .env.local file first')
    return
  }
  
  // Test simple message
  console.log('📤 Sending test message...')
  const success1 = await sendTelegramNotification(chatId, '🤖 Test message from TaoFinder website!')
  
  if (success1) {
    console.log('✅ Simple test message sent successfully')
  } else {
    console.log('❌ Failed to send simple test message')
  }
  
  // Test form submission message
  console.log('📤 Sending form submission test...')
  const formMessage = createFormSubmissionMessage({
    name: 'Jean Dupont',
    phone: '06 12 34 56 78',
    location: 'Chemin des Clautasses, Toulouse',
    description: 'Chat gris tigré vu dans le jardin, très amical',
    photoUrl: 'https://utfs.io/f/example-photo-url.jpg',
    timestamp: new Date()
  })
  
  const success2 = await sendTelegramNotification(chatId, formMessage)
  
  if (success2) {
    console.log('✅ Form submission test message sent successfully')
  } else {
    console.log('❌ Failed to send form submission test message')
  }
}

// Main execution
const command = process.argv[2]

switch (command) {
  case 'get-updates':
    getUpdates()
    break
  case 'send-test':
    sendTestMessage()
    break
  default:
    console.log('Usage:')
    console.log('  npx tsx scripts/test-telegram.ts get-updates    # Get your chat ID')
    console.log('  npx tsx scripts/test-telegram.ts send-test      # Send test message')
    break
}