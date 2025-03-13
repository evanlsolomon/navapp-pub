
import '../index.css'
import { Place } from '../utils/types'

function SearchResultCard({ name, address, geometry, setSelectedResult }: any) {

  function handleResultSelected(event:any){
    event.preventDefault()
    event.stopPropagation()
    const new_place : Place = {
      id:`${geometry.latitude}${geometry.longitude}`, 
      name:name, 
      address:address, 
      geometry:geometry}

      setSelectedResult(new_place)
  }

  return (
    <div className='search-result-card' onClick={(e:any)=> handleResultSelected(e)}>
      <div>Name: {name}</div>
      <div>Address: {address}</div>
    </div>
  )
}

export { SearchResultCard }