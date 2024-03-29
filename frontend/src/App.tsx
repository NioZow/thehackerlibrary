import Searchbar from "@/components/elements/searchbar"
import Header from "@/components/elements/header"
import Footer from "@/components/elements/footer"

export const App = () => {
  return (
    <div>
      <h1>The Hacker Library</h1>
      <p>Library of hacking learning resources, not sponsored</p>
      <div className="max-w-4xl flex item-center justify-center w-full h-full"> 
        <Searchbar />
      </div>
    </div>
  )
}

export const AppHeader = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

export const AppFooter = () => {
  return (
    <div>
      <Footer />
    </div>
  )
}