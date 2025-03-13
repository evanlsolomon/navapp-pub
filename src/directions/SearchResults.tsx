
import '../index.css'
import { SearchResultCard } from './SearchResultCard'

function SearchResults({ searchResults, setSelectedResult }: any) {

  return (
    <div className="searchResultsPane">
      {searchResults.map((result: any) => {
        return (
          <SearchResultCard
            key={result.id}
            geometry={result.geometry}
            name={result.name}
            address={result.address} 
            setSelectedResult={setSelectedResult}/>
        )
      })}
    </div>
  )
}

export { SearchResults }