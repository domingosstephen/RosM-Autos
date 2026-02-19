import { cn } from '@/lib/utils'

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label: string
  error?: string
}

export function Textarea({ label, error, id, required, rows = 4, className, ...props }: TextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy mb-1">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <textarea
        id={id}
        required={required}
        rows={rows}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-border focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition text-base resize-y',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  )
}
