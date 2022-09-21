import { useMemo } from "react"
import { useLoadScript } from "@react-google-maps/api"
import {
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api"
import useGetAllBars from "../hooks/useGetAllBars"

const BeerMap = () => {
  /* Hämtar kartan */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  /* Hämtar alla barer och... */
  const { data: bars, loading } = useGetAllBars("bars")

  /* ...Konsol-loggar */
  console.log("Här är barerna: ", bars)

  /* Mittenpunkten på kartan när den först laddas in */
  const center = useMemo(() => ({ lat: 55.5918775, lng: 13.0078026 }), [])
  /* Om kartan inte är laddad returnerar vi detta */
  if (!isLoaded) return <h1 className="text-4xl">Loading...</h1>

  /* Om allt laddas korrekt, visa kartan */
  return (
    <GoogleMap zoom={13} center={center} mapContainerClassName="h-5/6 w-5/6">
      {/*         <MarkerClusterer></MarkerClusterer> */}
      <Marker position={center} />
    </GoogleMap>
  )
}

export default BeerMap
