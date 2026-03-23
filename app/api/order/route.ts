import { NextResponse } from "next/server"

const TELEGRAM_TOKEN = "8502243035:AAHSmW2OWFPWcFEc4g1Gw9CngjuZH6X_NTg"
const CHAT_ID = "354224405"

export async function POST(request: Request) {
  try {
    const { name, phone, address, email, cart, total } = await request.json()

    // Номер заказа на основе времени
    const orderNumber = Date.now().toString().slice(-6)

    const items = cart.map((item: any) => 
      `  • [Арт. ${item.id}] ${item.name} × ${item.quantity} — ${item.price * item.quantity} PLN`
    ).join("\n")

    const message = `
🛍 *НОВЫЙ ЗАКАЗ #${orderNumber}*
━━━━━━━━━━━━━━━━━━
👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
📧 *Email:* ${email}
📍 *Адрес:* ${address}
━━━━━━━━━━━━━━━━━━
🛒 *Товары:*
${items}
━━━━━━━━━━━━━━━━━━
💰 *Итого: ${total} PLN*
    `.trim()

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    })

    if (!response.ok) {
      throw new Error("Telegram error")
    }

    return NextResponse.json({ success: true, orderNumber })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}