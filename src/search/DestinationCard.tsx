
import '../index.css'
import { useState } from 'react'
import {TrashIcon, PlusIcon, DirectionsIcon} from '../icons'
import { Place } from '../utils/types'


function DestinationCard({setIsSearching, destination, handleDirectionsIconClick}:
   {setIsSearching:Function, destination: Place, handleDirectionsIconClick: Function}) {

  function handleDestinationTextAreaClick(): void {
    setIsSearching(true)
  }

  return (
    <>
      <div className='destination-card'>
        <span onClick={handleDestinationTextAreaClick} className='destination-card-textarea'>{destination.address}</span>
        <span className='destination-card-icons-tray'>
        <DirectionsIcon onClick={(e:Event) => { handleDirectionsIconClick(e)}} />
        </span>
      </div>
    </>
  )
}

export default DestinationCard 