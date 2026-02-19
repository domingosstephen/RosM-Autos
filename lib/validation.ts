import { z } from 'zod'

export const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  country: z.string().min(1, 'Please select your country'),
  vehicleInterest: z.string().optional(),
  message: z.string().max(2000, 'Message must be under 2000 characters').optional(),
  honeypot: z.string().max(0, 'Bot detected'),
})

export type InquirySchemaType = z.infer<typeof inquirySchema>
