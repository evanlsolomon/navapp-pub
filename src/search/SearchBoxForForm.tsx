
import '../index.css'
import { useState } from 'react'
import { SearchIcon, DirectionsIcon, XIcon } from '../icons'
import { SearchResults } from './SearchResults'
import { queryRemoteAPI } from '../utils/queryAPI'
import { Place } from '../utils/types'
import SearchBoxForFormInputField from './SearchBoxForFormInputField'


function SearchBoxForForm(
  { setIsSearching,
    places,
    updatePlaces, placeholder, value, setValue }:
    {
      setIsSearching: Function,
      places: Place[],
      updatePlaces: Function, placeholder: string, value: string, setValue: Function
    }) {

  const [searchResults, setSearchResults] = useState<Place[]>([])

  // use timeout to delay search request
  const [searchTimeout, setSearchTimeout] = useState(0)

  function handleSearchResultSelection(place: Place): void {
    console.log('inside handleSearchResultSelection')
    updatePlaces(place)
    setValue(place.address)
    setSearchResults([])
    setIsSearching(false)
  }

  async function executeSearchRequest(): Promise<void> {

    const parsed_results = await queryRemoteAPI(value)
    setSearchResults(parsed_results)
  }

  // only want to search after 3 characters have been entered 
  // and after the user has stopped typing
  async function handleSearchBoxChange(e: any): Promise<void> {
    console.log('inside handleSearchBoxChange')
    e.preventDefault();
    e.stopPropagation();
    setValue(e.target.value)

    if (e.target.value.length >= 3) {

      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
      setSearchTimeout(setTimeout(() => {
        executeSearchRequest();
      }, 2000))
    }
  }

  function handleSearchBoxBlur(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    if (places.length > 0 && places[0].address === value) {
      setIsSearching(false)
    }
  }

  return (
    <>
      <div className='place-search-box'>
        <SearchBoxForFormInputField onBlur={handleSearchBoxBlur} placeholder={placeholder} value={value} handleSearchBoxChange={handleSearchBoxChange} />
        {(value.length > 0) && <XIcon onClick={() => setValue('')} />}

      </div>
      {(value.length >= 3) &&
        < SearchResults
          searchResults={searchResults}
          setSelectedResult={handleSearchResultSelection} />
      }
    </>
  )
}

export default SearchBoxForForm 