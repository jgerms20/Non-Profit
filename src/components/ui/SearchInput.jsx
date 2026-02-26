import { Search } from 'lucide-react'

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full pl-9 pr-4 py-2 text-sm
          bg-white dark:bg-slate-800
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          border border-slate-200 dark:border-slate-700
          rounded-lg
          outline-none
          focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500
          transition-colors duration-150
        "
      />
    </div>
  )
}
