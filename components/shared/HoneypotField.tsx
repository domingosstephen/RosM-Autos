interface HoneypotFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor="honeypot">Website</label>
      <input
        type="text"
        id="honeypot"
        name="honeypot"
        value={value}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  )
}
