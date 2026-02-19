import { NextResponse } from 'next/server'
import { inquirySchema } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = inquirySchema.safeParse(body)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      }

      return NextResponse.json(
        { success: false, errors: fieldErrors },
        { status: 400 }
      )
    }

    // Honeypot check — if filled, silently return success to not alert bots
    if (result.data.honeypot && result.data.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Inquiry received' })
    }

    // In a production application this is where you would:
    // - Send a notification email to the sales team
    // - Store the inquiry in a database
    // - Push to a CRM system
    // - Send a confirmation email to the customer

    return NextResponse.json({ success: true, message: 'Inquiry received' })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    )
  }
}
