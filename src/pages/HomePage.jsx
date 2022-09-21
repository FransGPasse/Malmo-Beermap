import { useLoadScript } from "@react-google-maps/api"
import BeerMap from "../components/BeerMap"

const HomePage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  /* Om kartan inte är laddad returnerar vi detta */
  if (!isLoaded) return <h1>Loading...</h1>

  /* Om allt laddas korrekt, visa kartan */
  return (
    <div className="h-screen w-screen flex flex-col m-auto items-center justify-center space-y-4">
      <h1 className="text-4xl">Malmö BeerMap 🍺</h1>
      <BeerMap />
    </div>
  )
}

export default HomePage
