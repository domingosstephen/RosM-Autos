import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  children: React.ReactNode
  fullWidth?: boolean
  icon?: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variants = {
  primary: 'bg-cta text-white hover:bg-cta-hover',
  secondary: 'border-2 border-cta text-cta hover:bg-cta hover:text-white',
  ghost: 'text-navy hover:bg-surface-alt',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-hover',
}

const sizes = {
  sm: 'px-4 py-2 text-sm min-h-[40px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[48px]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  fullWidth,
  icon,
  className,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cta/30',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//')
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {icon}
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {icon}
      {children}
    </button>
  )
}
