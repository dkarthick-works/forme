import { useEffect, useState } from 'react'
import { API_URL } from '../config'

export function useWishes() {
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchWishes() {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        if (!cancelled) setWishes(data.records || [])
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchWishes()
    return () => {
      cancelled = true
    }
  }, [])

  return { wishes, loading, error }
}
