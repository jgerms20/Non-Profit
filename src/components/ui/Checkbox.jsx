export default function Checkbox({
  checked,
  onChange,
  label,
  className = '',
}) {
  return (
    <label
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="
          w-4 h-4 rounded border border-slate-300 dark:border-slate-600
          bg-white dark:bg-slate-800
          accent-blue-500
          cursor-pointer
          focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-0
          transition-colors
        "
      />
      {label && (
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}
    </label>
  )
}
