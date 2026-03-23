import { NextResponse } from "next/server"
import { readFileSync, writeFileSync, existsSync } from "fs"
import { join } from "path"

const TELEGRAM_TOKEN = "8502243035:AAHSmW2OWFPWcFEc4g1Gw9CngjuZH6X_NTg"
const CHAT_ID = "354224405"
const COUNTER_FILE = join(process.cwd(), "order-counter.json")

function getNextOrderNumber(): string {
  let counter = 1
  if (existsSync(COUNTER_FILE)) {
    try {
      const data = JSON.parse(readFileSync(COUNTER_FILE, "utf-8"))
      counter = (data.counter || 0) + 1
    } catch {}
  }
  writeFileSync(COUNTER_FILE, JSON.stringify({ counter }))
  return String(counter).padStart(4, "0")
}

export async function POST(request: Request) {
  try {
    const { name, phone, address, email, cart, total } = await request.json()
    const orderNumber = getNextOrderNumber()

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

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    })

    return NextResponse.json({ success: true, orderNumber })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}