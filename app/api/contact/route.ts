import { NextResponse } from "next/server"

const TELEGRAM_TOKEN = "8502243035:AAHSmW2OWFPWcFEc4g1Gw9CngjuZH6X_NTg"
const CHAT_ID = "354224405"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    const text = `
📬 *НОВОЕ СООБЩЕНИЕ*
━━━━━━━━━━━━━━━━━━
👤 *Имя:* ${name}
📧 *Email:* ${email}
📌 *Тема:* ${subject}
━━━━━━━━━━━━━━━━━━
💬 *Сообщение:*
${message}
    `.trim()

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown"
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}