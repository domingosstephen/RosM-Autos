export interface InquiryFormData {
  fullName: string
  email: string
  phone: string
  country: string
  vehicleInterest: string
  message: string
  honeypot: string
}

export interface InquiryResponse {
  success: boolean
  message: string
}
