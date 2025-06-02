import { useState, useEffect } from 'react'
import { client } from '../lib/sanity.client'
import { LOCALE_QUERY } from '@repo/groq/organisms/locale.query'

const useLocaleData = (locale: any, slug: any) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('Fetching with:', { locale, slug })
        const result = await client.fetch(LOCALE_QUERY, { locale, slug })
        // console.log('Fetched result:', result)
        setData(result)
      } catch (error) {
        console.error('Error fetching navigation data:', error)
      }
    }

    if (locale && slug) fetchData()
  }, [locale, slug])

  return data
}

export default useLocaleData
