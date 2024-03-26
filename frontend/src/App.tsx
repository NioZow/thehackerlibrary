import Searchbar from "@/components/elements/searchbar"
import Filter from "@/components/elements/filter"

const App = () => {
  return (
    <div>
      <h1>The Hacker Library</h1>
      <div className="max-w-4xl flex item-center justify-center w-full h-full"> 
        <Searchbar />
      </div>
      <Filter />
    </div>
  )
}

export default App