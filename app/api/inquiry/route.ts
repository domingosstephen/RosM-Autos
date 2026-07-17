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

    const WEB3FORMS_KEY = '22d879ce-78c3-4c8f-8db8-ef022a1c3ad2'

    // Forward to Web3Forms for email delivery
    const web3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Vehicle Inquiry — ${result.data.vehicleInterest || 'General'}`,
        from_name: result.data.fullName,
        name: result.data.fullName,
        email: result.data.email,
        phone: result.data.phone,
        country: result.data.country,
        vehicle_interest: result.data.vehicleInterest,
        message: result.data.message,
      }),
    })

    const web3Data = await web3Res.json().catch(() => null)

    if (!web3Res.ok || !web3Data?.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to send inquiry' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, message: 'Inquiry received' })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    )
  }
}
