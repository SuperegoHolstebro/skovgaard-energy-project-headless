import { useState, useEffect } from 'react'
import { client } from '@repo/utils/src/lib/sanity.client'
import { NAVIGATION_QUERY } from '@repo/groq/documents/navigation.query'

const useNavigationData = (locale) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await client.fetch(NAVIGATION_QUERY, { locale: locale })
        result = await result
        setData(result)
      } catch (error) {
        console.error('Error fetching navigation data:', error)
      }
    }

    fetchData()
  }, [locale])

  return data
}

export default useNavigationData
