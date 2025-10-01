
import { Place } from './types'



async function buildSearchRequestURL(coordinates: { lat: number; long: number; }[]): Promise<URL> {
  const VALHALLA_PROXY_URL = import.meta.env.VITE_VALHALLA_PROXY_URL;

  let params = {
    locations: coordinates.map(coord => ({ "lat": coord.lat, "lon": coord.long })),
    costing: "auto",
  };

  let data = JSON.stringify(params);
  const url = new URL(`${VALHALLA_PROXY_URL}/baldrabbits?json=${data}`)
  return url
}

function decodePolyline(str: string, precision: number): number[][] {
  var index = 0,
    lat = 0,
    lng = 0,
    coordinates = [],
    shift = 0,
    result = 0,
    byte = null,
    latitude_change,
    longitude_change,
    factor = Math.pow(10, precision || 6);

  // Coordinates have variable length when encoded, so just keep
  // track of whether we've hit the end of the string. In each
  // loop iteration, a single coordinate is decoded.
  while (index < str.length) {

    // Reset shift, result, and byte
    byte = null;
    shift = 0;
    result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

    shift = result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push([lng / factor, lat / factor]);
  }

  return coordinates;
};

function parseSearchResults(data: any): number[][] {

  const route_string = data["trip"]["legs"]["0"]["shape"]
  // const results = route_string_lat_long_reversed.map((coord: any) => [coord[1], coord[0]])
  // return results
  return decodePolyline(route_string, 6);
}

function getCoordsFromPlace(place: Place): { lat: number; long: number } {
  return { lat: place.geometry.latitude, long: place.geometry.longitude };
}

async function queryValhallaBackend(waypoints: Place[]): Promise<any> {

  const coords_of_waypoints = waypoints.map((waypoint: Place) => getCoordsFromPlace(waypoint))
  const url = await buildSearchRequestURL(coords_of_waypoints)

  // console.log(`inside queryOSRMBackend, url: ${url}`)


  const response = await fetch(url.toString())
  const data = await response.json()

  console.log('response from server:', data)
  let parsed_results = parseSearchResults(data)
  // console.log(data["routes"]["0"]["geometry"]["coordinates"])


  return parsed_results
}

export { queryValhallaBackend } 