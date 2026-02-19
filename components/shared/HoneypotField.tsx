interface HoneypotFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input
        type="text"
        id="website"
        name="website"
        value={value}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  )
}
