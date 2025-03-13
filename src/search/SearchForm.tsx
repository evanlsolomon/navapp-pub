import '../index.css'
import SearchBoxForForm from './SearchBoxForForm'
import { DirectionsIcon } from '../icons'
import { Place } from '../utils/types'
import { useState } from 'react'
import DestinationCard  from './DestinationCard'

function SearchForm({places, setPlaces, toggleDialogState}:{places:Place[], setPlaces: Function, toggleDialogState: Function}) {

  const [selectedLocation, setSelectedLocation] = useState<Place |undefined>(undefined)
  const [value, setValue] = useState<string>('')
  const [isSearching, setIsSearching] = useState(true)

  function handleSearchResultSelection(place:Place): void {
    setPlaces([place])
    setSelectedLocation(place)
  }

  function handleDirectionsIconClick(event:any): void {
    console.log('inside SearchForm, handleDirectionsIconClick')
    event.preventDefault()
    event.stopPropagation()
    toggleDialogState('directions')
  }

  return (
    <>
    {(isSearching) &&
      <SearchBoxForForm places={places} setIsSearching={setIsSearching} updatePlaces={handleSearchResultSelection}  placeholder={"search"} value={value} setValue={setValue}/>
    }
    {(!isSearching && selectedLocation) && <DestinationCard setIsSearching={setIsSearching} destination={selectedLocation} handleDirectionsIconClick={handleDirectionsIconClick}/>}
    {/* {selectedLocation &&  <DirectionsIcon onClick={(e:Event) => { handleDirectionsIconClick(e)}} />} */}
    </>
  )
}

export default SearchForm
