'use client'

import { useState } from 'react'
import { inquirySchema } from '@/lib/validation'
import { PRIORITY_COUNTRIES } from '@/lib/constants'
import { Card } from '@/components/shared/Card'
import { Input } from '@/components/shared/Input'
import { Textarea } from '@/components/shared/Textarea'
import { Select } from '@/components/shared/Select'
import { HoneypotField } from '@/components/shared/HoneypotField'
import { Button } from '@/components/shared/Button'

const countryOptions = PRIORITY_COUNTRIES.map((c) => ({ value: c, label: c }))

interface FormData {
  fullName: string
  email: string
  phone: string
  country: string
  vehicleInterest: string
  message: string
  honeypot: string
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  vehicleInterest: '',
  message: '',
  honeypot: '',
}

export function InquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setSubmitStatus(null)

    // Honeypot check — silently reject bots
    if (formData.honeypot) {
      setSubmitStatus('success')
      return
    }

    const result = inquirySchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormData
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (res.ok) {
        setSubmitStatus('success')
        setFormData(initialFormData)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card padding="lg">
      <h2 className="text-xl font-bold text-navy mb-2">Get Your Free, No-Obligation Quote</h2>
      <p className="text-sm text-muted mb-6">Fill out the form below and we will send you a detailed quote within 24 hours — including vehicle price, shipping, and all fees.</p>

      {submitStatus === 'success' && (
        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-success text-sm font-medium">
          Thank you! We&apos;ll get back to you within 24 hours.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-error text-sm font-medium">
          Something went wrong. Please try again or contact us directly via WhatsApp or phone.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input
          label="Full Name"
          id="fullName"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Your full name"
          autoComplete="name"
        />

        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <Input
          label="Phone"
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+1 234 567 890"
          autoComplete="tel"
        />

        <Select
          label="Country"
          id="country"
          name="country"
          required
          value={formData.country}
          onChange={handleChange}
          error={errors.country}
          options={countryOptions}
          placeholder="Select your country"
        />

        <Input
          label="Vehicle Interest"
          id="vehicleInterest"
          name="vehicleInterest"
          value={formData.vehicleInterest}
          onChange={handleChange}
          error={errors.vehicleInterest}
          placeholder="e.g., Toyota Hilux 2022"
        />

        <Textarea
          label="Message"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          rows={4}
          placeholder="Tell us about your requirements..."
        />

        <HoneypotField
          value={formData.honeypot}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Get My Free Quote →'}
        </Button>
      </form>
    </Card>
  )
}
