
import { Place } from './types'

async function buildSearchRequestURL(searchString: string): Promise<URL> {

  const MB_PROXY_URL = import.meta.env.VITE_MB_PROXY_URL;

  let params = new URLSearchParams({
    q: `${searchString}`,
  });

  const url = new URL(MB_PROXY_URL)

  url.search = params.toString()
  return url
}

function parseSearchResults(data: any): Place[] {
  let results: Place[] = data.map((result: any) => {
    return {
      id: result.properties.mapbox_id,
      name: result.properties.name,
      address: result.properties.full_address,
      geometry: {
        latitude: result.geometry.coordinates[1],
        longitude: result.geometry.coordinates[0]
      }
    }
  })

  return results
}

// async function reverseQueryMbAPI(lat: string, long:string): Promise<Place> {

// }

async function forwardQueryMbAPI(searchValue: string): Promise<Place[]> {

  const SB_LOCALSTORAGE_KEY = `sb-${import.meta.env.VITE_SUPABASE_DOMAIN}-auth-token`;

  const url = await buildSearchRequestURL(searchValue)
  const headers = { Authorization: `Bearer ${JSON.parse(localStorage[SB_LOCALSTORAGE_KEY]).access_token}` }
  const response = await fetch(url.toString(), { headers })
  const data = await response.json()

  let parsed_results = parseSearchResults(data["features"])

  return parsed_results
}

export { forwardQueryMbAPI } 