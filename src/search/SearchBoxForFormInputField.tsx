
import '../index.css'

function SearchBoxForFormInputField({ onBlur, placeholder, value, handleSearchBoxChange }:
  { onBlur: Function, placeholder: string, value: string, handleSearchBoxChange: Function }) {

  return (
    <input
      // autoFocus 
      onBlur={(e) => onBlur(e)} type="text" placeholder={placeholder} className='search-input' value={value}
      onChange={(e) => {
        handleSearchBoxChange(e)
      }} />
  )
}

export default SearchBoxForFormInputField 