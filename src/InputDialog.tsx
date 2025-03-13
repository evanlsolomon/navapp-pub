
import './index.css'
import { useState } from 'react'
import { SearchIcon, DirectionsIcon} from './icons'
import SearchBox from './SearchBox'
import DirectionsForm from './DirectionsForm'

function InputDialog({ addToPOIs }: any) {

  const [destinationInputIsVisible, setDestinationInputIsVisible] = useState(false)
  const [dialogState, setDialogState] = useState('search')
  const [destinations, setDestinations] = useState([])

  const searching = dialogState === 'search'
  const directions = dialogState === 'directions'

  function directionsButtonClicked(e: any): void {
    console.log('inside inputDialog: directionsButtonClicked')

    e.preventDefault(e);
    e.stopPropagation(e);
    setDialogState('directions')
    // setNumDestinations(numDestinations + 1)
  }

  return (
    <div id="inputDialog">
      {searching && <SearchBox dialogState={dialogState} addToPOIs={addToPOIs} directionsButtonHandler={directionsButtonClicked} placeholder={"search"} initialValue={''} />}
      {directions && <DirectionsForm dialogState={dialogState} addToPOIs={addToPOIs} destinations={destinations}/>}
    </div>
  )
}

export default InputDialog