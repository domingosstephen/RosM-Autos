import { cn } from '@/lib/utils'
import { generateWhatsAppLink } from '@/lib/utils'

interface WhatsAppLinkProps {
  phoneNumber: string
  message?: string
  children: React.ReactNode
  className?: string
}

export function WhatsAppLink({ phoneNumber, message, children, className }: WhatsAppLinkProps) {
  const href = generateWhatsAppLink(phoneNumber, message || "Hi, I'm interested in your vehicles.")

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('inline-flex items-center gap-2', className)}
    >
      {children}
    </a>
  )
}
