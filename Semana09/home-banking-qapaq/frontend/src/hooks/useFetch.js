import { useEffect, useState } from 'react'

export const useFetch = (request) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(Boolean(request))

  useEffect(() => {
    if (!request) return

    let isMounted = true

    Promise.resolve(request())
      .then((response) => {
        if (isMounted) setData(response)
      })
      .catch((requestError) => {
        if (isMounted) setError(requestError)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [request])

  return { data, error, loading }
}
