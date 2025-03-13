
import { Place } from './types'



async function buildSearchRequestURL(coordinates: string): Promise<URL> {
  let params = new URLSearchParams({
    steps: 'false',
    geometries: 'geojson',
    overview: 'full',
  });
  // const url = new URL(`http://127.0.0.1:5000/route/v1/driving/${coordinates}`)
  const url = new URL(`http://127.0.0.1:3000/route/v1/driving/${coordinates}`) // port 3000 is the default port for the OSRM backend

  url.search = params.toString()
  return url
}

function parseSearchResults(data: any): any {

  const route_string_lat_long_reversed = data["routes"]["0"]["geometry"]["coordinates"]
  const results = route_string_lat_long_reversed.map((coord: any) => [coord[1], coord[0]])
  // return results
  return route_string_lat_long_reversed
}

function getCoordsFromPlace(place: Place): string {
  return `${place.geometry.longitude},${place.geometry.latitude}`
}

async function queryOSRMBackend(waypoints: Place[]): Promise<any> {

  const coords_of_waypoints = waypoints.map((waypoint: Place) => getCoordsFromPlace(waypoint))
  const url = await buildSearchRequestURL(`${coords_of_waypoints.join(';')}`)

  // console.log(`inside queryOSRMBackend, url: ${url}`)


  const response = await fetch(url.toString())
  const data = await response.json()

  console.log('response from server:', data)
  let parsed_results = parseSearchResults(data)
  // console.log(data["routes"]["0"]["geometry"]["coordinates"])


  return parsed_results
}

export { queryOSRMBackend } 