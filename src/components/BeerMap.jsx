import { useMemo } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"

const BeerMap = () => {
  //Mittenpunkten på kartan när den först laddas in
  const center = useMemo(() => ({ lat: 55.5918775, lng: 13.0078026 }), [])

  return (
    <GoogleMap zoom={13} center={center} mapContainerClassName="h-5/6 w-5/6">
      <Marker position={center} />
    </GoogleMap>
  )
}

export default BeerMap
