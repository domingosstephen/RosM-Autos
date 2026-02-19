import { cn } from '@/lib/utils'

interface SelectProps extends React.ComponentProps<'select'> {
  label: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export function Select({ label, error, id, required, options, placeholder, className, ...props }: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy mb-1">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <select
        id={id}
        required={required}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-border focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition text-base bg-surface',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  )
}
