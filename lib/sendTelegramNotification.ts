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
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  // Don't send notification if token or chatId are undefined
  if (!botToken || !chatId) {
    console.error("Telegram bot token or chat ID is missing");
    return false;
  }

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      return false;
    }

    const data = await response.json();
    console.log("Telegram message sent successfully:", data.result.message_id);
    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
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
