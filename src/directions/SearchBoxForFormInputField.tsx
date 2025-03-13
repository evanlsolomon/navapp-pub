
import '../index.css'

function SearchBoxForFormInputField({placeholder, value, handleSearchBoxChange}:
  { placeholder: string, value: string, handleSearchBoxChange: Function }) {

  return (
      <input type="text" placeholder={placeholder} className='search-input' value={value}
        onChange={(e) => {
          handleSearchBoxChange(e)
        }} />
  )
}

export default SearchBoxForFormInputField 