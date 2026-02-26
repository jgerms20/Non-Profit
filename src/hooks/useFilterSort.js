import { useMemo } from 'react'

export function useFilterSort(items, options = {}) {
  const { filterFn, sortFn, searchQuery = '', searchFields = [] } = options

  return useMemo(() => {
    let result = [...items]

    if (searchQuery && searchFields.length > 0) {
      const q = searchQuery.toLowerCase()
      result = result.filter(item =>
        searchFields.some(field => {
          const val = item[field]
          return typeof val === 'string' && val.toLowerCase().includes(q)
        })
      )
    }

    if (filterFn) {
      result = result.filter(filterFn)
    }

    if (sortFn) {
      result.sort(sortFn)
    }

    return result
  }, [items, filterFn, sortFn, searchQuery, searchFields])
}
