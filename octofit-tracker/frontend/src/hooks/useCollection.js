import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

export function useCollection(endpoint) {
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    items: [],
    totalCount: 0
  })

  useEffect(() => {
    const abortController = new AbortController()

    setState({
      isLoading: true,
      error: null,
      items: [],
      totalCount: 0
    })

    fetchCollection(endpoint, abortController.signal)
      .then(({ items, totalCount }) => {
        setState({
          isLoading: false,
          error: null,
          items,
          totalCount
        })
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return
        }

        setState({
          isLoading: false,
          error,
          items: [],
          totalCount: 0
        })
      })

    return () => {
      abortController.abort()
    }
  }, [endpoint])

  return state
}