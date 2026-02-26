export default function Select({
  value,
  onChange,
  options = [],
  placeholder,
  className = '',
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`
        w-full px-3 py-2 text-sm
        bg-white dark:bg-slate-800
        text-slate-900 dark:text-slate-100
        border border-slate-200 dark:border-slate-700
        rounded-lg
        outline-none
        focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500
        transition-colors duration-150
        cursor-pointer
        appearance-none
        bg-no-repeat bg-right-3
        ${className}
      `}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundPosition: 'right 0.75rem center',
        paddingRight: '2.25rem',
      }}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
