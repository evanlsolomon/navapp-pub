
import '../index.css'
import { useState } from 'react'
import { SearchIcon, DirectionsIcon, XIcon } from '../icons'
import { SearchResults } from './SearchResults'
import { forwardQueryMbAPI } from '../utils/queryMbAPI'
import { Place } from '../utils/types'
import SearchBoxForFormInputField from './SearchBoxForFormInputField'


function SearchBoxForForm({ children, placeholder_id, updatePlaces, placeholder, initialValue }:
  { children: any, placeholder_id: string, updatePlaces: Function, placeholder: string, initialValue: string }) {

  const [value, setValue] = useState<string>(initialValue)
  const [isSearching, setIsSearching] = useState(true)
  const [searchResults, setSearchResults] = useState<Place[]>([])

  // use timeout to delay search request
  const [searchTimeout, setSearchTimeout] = useState(0)

  function handleSearchResultSelection(place: Place): void {
    updatePlaces(place, placeholder_id)
    setValue(place.address)
    setSearchResults([])
  }

  async function executeSearchRequest(): Promise<void> {
    setIsSearching(true)

    const parsed_results = await forwardQueryMbAPI(value)
    setIsSearching(false)
    setSearchResults(parsed_results)
  }

  // only want to search after 3 characters have been entered 
  // and after the user has stopped typing
  async function handleSearchBoxChange(e: any): Promise<void> {
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

  return (
    <>
      <div className='place-search-box'>
        <SearchBoxForFormInputField placeholder={placeholder} value={value} handleSearchBoxChange={handleSearchBoxChange} />
        {(value.length > 0) && <XIcon onClick={() => setValue('')} />}
        {children}
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