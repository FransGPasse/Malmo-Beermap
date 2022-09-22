import BeerMap from "../components/BeerMap"
import GoogleBeerMap from "../components/GoogleBeerMap"
import SearchBar from "../components/SearchBar"

const HomePage = () => {
  return (
    <div className="h-screen w-screen flex flex-col m-auto items-center justify-center space-y-4">
      <h1 className="text-4xl">Malmö BeerMap 🍺</h1>
      <GoogleBeerMap />
    </div>
  )
}

export default HomePage
