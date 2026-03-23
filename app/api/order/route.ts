import { NextResponse } from "next/server"

const TELEGRAM_TOKEN = "8502243035:AAHSmW2OWFPWcFEc4g1Gw9CngjuZH6X_NTg"
const CHAT_ID = "354224405"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, address, email, cart, total } = body

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

    const tgResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    })

    const tgData = await tgResponse.json()
    console.log("Telegram response:", tgData)

    return NextResponse.json({ success: true, orderNumber })
  } catch (error) {
    console.error("Order error:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}