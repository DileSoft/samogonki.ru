import { useEffect, useState } from 'react'

type State<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export function useArchiveJson<T>(file: string): State<T> {
  const [state, setState] = useState<State<T>>({ data: null, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    setState({ data: null, loading: true, error: null })

    fetch(`data/${file}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<T>
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState({ data: null, loading: false, error: error instanceof Error ? error.message : 'Ошибка загрузки' })
      })

    return () => controller.abort()
  }, [file])

  return state
}
