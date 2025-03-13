
import './index.css'

function FormContainer({mapCenter, updateCenter}: any) {
  
  
  return (
    <div id="formContainer">
      <h2>Form stuff</h2>
      <p>Map center: {mapCenter}</p>
      <button onClick={()=>{
        let newCenter = {latitude: mapCenter[0], longitude: mapCenter[1]}
        console.log('newCenter', newCenter)
        updateCenter(newCenter)}} >Recenter</button>
    </div>
  )
}

export default FormContainer