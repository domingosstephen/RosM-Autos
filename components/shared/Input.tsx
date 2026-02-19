import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
  label: string
  error?: string
}

export function Input({ label, error, id, required, className, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy mb-1">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        id={id}
        required={required}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-border focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition text-base',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  )
}
