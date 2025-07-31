/**
 * Sends a message to a Telegram chat using the Telegram Bot API
 * @param chatId - The chat ID to send the message to
 * @param message - The message text to send
 * @returns Promise<boolean> - Returns true if successful, false otherwise
 */
export async function sendTelegramNotification(
  chatId: string,
  message: string
): Promise<boolean> {
  console.log('🚀 sendTelegramNotification called with:')
  console.log('- chatId:', chatId)
  console.log('- message length:', message.length)
  
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  console.log('- botToken from env:', !!botToken, botToken ? '(length: ' + botToken.length + ')' : '(undefined)')

  // Don't send notification if token or chatId are undefined
  if (!botToken || !chatId) {
    console.error("❌ Telegram bot token or chat ID is missing:");
    console.error('- botToken missing:', !botToken)
    console.error('- chatId missing:', !chatId)
    return false;
  }

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  console.log('🎯 Telegram API URL prepared (token hidden)');

  try {
    console.log('🚀 Making fetch request to Telegram API...');
    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML", // Optional: allows HTML formatting in messages
      }),
    });

    console.log('📊 Response received - Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Telegram API error response:", errorData);
      console.error('Full response details:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        errorData
      });
      return false;
    }

    const data = await response.json();
    console.log("✅ Telegram message sent successfully!");
    console.log('- Message ID:', data.result.message_id);
    console.log('- Full response:', data);
    return true;
  } catch (error) {
    console.error("❌ Error sending Telegram notification:", error);
    console.error('Error details:', {
      name: (error as any)?.name,
      message: (error as any)?.message,
      stack: (error as any)?.stack,
      cause: (error as any)?.cause
    });
    return false;
  }
}

// Usage example:
// const success = await sendTelegramNotification('YOUR_CHAT_ID', 'Test message from TaoFinder website!');
// if (success) {
//   console.log('Notification sent successfully');
// } else {
//   console.log('Failed to send notification');
// }

// Example for form submission notification:
export function createFormSubmissionMessage(formData: {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  description?: string;
  photoUrl?: string;
  timestamp?: Date;
}): string {
  const { name, email, phone, location, description, photoUrl, timestamp } = formData;

  return `
🐱 <b>Nouvelle observation de Tao!</b>

📅 <b>Date:</b> ${
    timestamp
      ? timestamp.toLocaleString("fr-FR")
      : new Date().toLocaleString("fr-FR")
  }
👤 <b>Nom:</b> ${name || "Non renseigné"}
📧 <b>Email:</b> ${email || "Non renseigné"}
📱 <b>Téléphone:</b> ${phone || "Non renseigné"}
📍 <b>Lieu:</b> ${location || "Non renseigné"}
📝 <b>Description:</b> ${description || "Aucune description"}

📸 <b>Photo:</b> ${photoUrl ? `<a href="${photoUrl}">Voir la photo</a>` : "Aucune photo"}
  `.trim();
}
