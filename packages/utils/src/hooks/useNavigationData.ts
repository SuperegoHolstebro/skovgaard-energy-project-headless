import { useState, useEffect } from 'react'
import { NAVIGATION_QUERY } from '@repo/groq/documents/navigation.query'
import { client } from '../lib/sanity.client'

const useNavigationData = (locale: any) => {
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
