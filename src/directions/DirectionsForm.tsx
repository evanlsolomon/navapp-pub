
import '../index.css'
import './directions.css'

import WaypointCard from './WaypointCard'
import SearchBoxForForm from './SearchBoxForForm'
import { queryOSRMBackend } from '../utils/queryOSRMBackend'
import { Place } from '../utils/types'
import { TrashIcon, PlusIcon, XIcon, MinusIcon } from '../icons'
import { useState } from 'react'
import { queryValhallaBackend } from '../utils/queryValhallaBackend'


function DirectionsForm(
  { dialogState, toggleDialogState, places, setPlaces, setRoute }:
    { dialogState: string, toggleDialogState: Function, places: Place[], setPlaces: Function, setRoute: Function }) {

  const [waypoints, setWaypoints] = useState<Place[]>(() => {
    if (places.length === 0) {
      return [getEmptyWaypoint()]
    } else if (places.length === 1) {
      return [getEmptyWaypoint(), ...places]
    } else {
      return places
    }
  })

  const [directionsCalledOnAllPlaces, setDirectionsCalledOnAllPlaces] = useState<boolean>(false)


  function getEmptyWaypoint(): Place {
    return {
      id: `${crypto.randomUUID()}`,
      name: '',
      address: '',
      geometry: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  async function directionsButtonClicked(e: any): Promise<void> {

    console.log('inside directionsButtonClicked, places:', places)
    e.preventDefault(e);
    e.stopPropagation(e);

    const route_data = await queryValhallaBackend(places)
    // const route_data = await queryOSRMBackend(places)
    // console.log(`inside directionsButtonClicked, route_data: ${route_data}`)
    setRoute(route_data)
    setDirectionsCalledOnAllPlaces(true)
  }

  console.log('inside DirectionsForm, places:', places)



  function handleTrashIconClick(): void {
    console.log('inside handleTrashIconClick')
  }

  function handlePlusIconClick(): void {
    console.log('inside handlePlusIconClick')
    // setEmptySearchBoxCount(emptySearchBoxCount + 1)
    setWaypoints((old_waypoints: Place[]) => [...old_waypoints,
    {
      id: `${crypto.randomUUID()}`,
      name: '',
      address: '',
      geometry: {
        latitude: 0,
        longitude: 0
      }
    }
    ])
  }

  function handleXIconClick(): void {
    setPlaces([])
    setRoute(null)
    toggleDialogState('search')
  }

  function handleNewPlace(place: Place, placeholder_id: string, route_position: number): void {
    console.log('inside handleNewPlace')
    setWaypoints((old_waypoints: Place[]) => {
      const new_waypoints = old_waypoints.map((old_waypoint: Place) => {
        if (old_waypoint.id === placeholder_id) {
          return place
        } else {
          return old_waypoint
        }
      })
      return new_waypoints
    })
    setPlaces((old_places: Place[]) => {
      let temp_places = [...old_places]
      temp_places.splice(route_position, 0, place)
      return temp_places
    }
    )
    setDirectionsCalledOnAllPlaces(false)
  }

  function handleRemoveWaypoint(waypoint_id: string): void {
    console.log('inside DirectionsForm, fn: handleDeleteWaypoint, waypoint_id:', waypoint_id)
    setPlaces((old_places: Place[]) => old_places.filter((place: Place) => place.id !== waypoint_id))
    setWaypoints((old_waypoints: Place[]) => {
      const new_waypoints = old_waypoints.filter((curr: Place) => curr.id !== waypoint_id)
      return new_waypoints
    })
    console.log(`directionsCalledOnAllPlaces: ${directionsCalledOnAllPlaces}`)
    if (directionsCalledOnAllPlaces) {
      setRoute(null)
    }
  }



  return (
    <div id="addressForm">
      <XIcon onClick={handleXIconClick} />
      {waypoints.map((place: Place, index) => {
        return <WaypointCard key={place.id} position={index} waypoint={place} handleNewPlace={handleNewPlace} setWaypoints={setWaypoints} setPlaces={setPlaces} handleRemoveWaypoint={handleRemoveWaypoint} />
      })}
      <span>Add stop</span>
      <PlusIcon onClick={handlePlusIconClick} />
      <br />
      <button onClick={directionsButtonClicked} id='get-directions-button'>Get Directions</button>
    </div>
  )
}

export default DirectionsForm