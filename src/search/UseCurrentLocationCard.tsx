
import '../index.css'
import { Place } from '../utils/types'

function UseCurrentLocationCard({ name, setSelectedResult }: any) {

  function handleGetCurrLocationSelection(e: any) {
    console.log('inside handleSearchBoxChange')
    e.preventDefault();
    e.stopPropagation();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // async function findPlaceNameOfCurrentPosition(): Promise<void> {
  //   lat, long =
  //   const parsed_results = await reverseQueryMbAPI(value)
  //   setSearchResults(parsed_results)
  // }

  // // only want to search after 3 characters have been entered 
  // // and after the user has stopped typing
  // async function handleSearchBoxChange(e: any): Promise<void> {


  //       executeSearchRequest();

  // }

  function success(position: any) {

    const new_place: Place = {
      id: `${position.coords.latitude}${position.coords.longitude}`,
      name: `${position.coords.latitude}${position.coords.longitude}`,
      address: `${position.coords.latitude}${position.coords.longitude}`,
      geometry: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    }

    setSelectedResult(new_place)
  }

  function error() {
    alert("Sorry, no position available.");
  }

  return (
    <div className='search-result-card' onClick={(e: any) => handleGetCurrLocationSelection(e)}>
      <div>Current location: {name}</div>
    </div>
  )
}

export { UseCurrentLocationCard }