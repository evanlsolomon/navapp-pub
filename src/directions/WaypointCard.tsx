
import '../index.css'
import { useState } from 'react'
import { TrashIcon, MinusIcon } from '../icons'
import { Place } from '../utils/types'
import SearchBoxForForm from './SearchBoxForForm'


function WaypointCard({ waypoint, position, handleNewPlace, setWaypoints, setPlaces, handleRemoveWaypoint }:
  { waypoint: Place, position: number, handleNewPlace: Function, setWaypoints: Function, setPlaces: Function, handleRemoveWaypoint: Function }) {

  function handleTrashIconClick(): void {

    handleRemoveWaypoint(waypoint.id)
  }

  function handleDestinationTextAreaClick(): void {
    console.log(`inside handleDestinationTextAreaClick, id: ${waypoint.id}`)
  }

  function handleSearchResultSelection(place: any, placeholder_id: string): void {
    console.log('inside handleSearchResultSelection')

    handleNewPlace(place, placeholder_id, position)
  }


  function handleMinusIconClick(): void {
    console.log('inside handleMinusIconClick')
    setWaypoints((old_waypoints: Place[]) => {
      const new_waypoints = old_waypoints.filter((curr: Place) => curr.id !== waypoint.id)
      return new_waypoints
    })
  }

  return (
    <>
      {(waypoint.name === '') && <SearchBoxForForm placeholder_id={waypoint.id} updatePlaces={handleSearchResultSelection} placeholder={"waypoint"} initialValue={''}>
        {<MinusIcon onClick={handleMinusIconClick} />}
      </SearchBoxForForm>
      }
      {(waypoint.name !== '') &&
        <div className='destination-card'>
          <span onClick={handleDestinationTextAreaClick} className='destination-card-textarea'>{waypoint.address}</span>
          <span className='destination-card-icons-tray'>
            <TrashIcon onClick={handleTrashIconClick} />
          </span>
        </div>}
    </>
  )
}

export default WaypointCard 