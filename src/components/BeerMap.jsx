import { useEffect, useMemo, useState, useRef, useCallback } from "react"
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api"
import getSingleBar from "../hooks/useGetDocument"
import mapStyles from "../assets/mapStyles"
import BeerIcon from "../assets/images/beer-icon.png"
import useGetCollection from "../hooks/useGetCollection"

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  setMap: null,
}

const BeerMap = () => {
  // här sparas den baren som användaren har klickat på och vill ha mer information om
  const [selected, setSelected] = useState(null)

  /* Hämtar kartan */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  // referens till kartan
  const mapRef = useRef()

  // callback som skickas när kartan laddas, assignas sedan till mapRef för att slippa omladdning av kartan och otrevlig användarupplevelse
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const onMapClick = useCallback((event) => {
    console.log((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    ])
  }, [])

  // funktionen för att kartan ska gå till det ställe man klickar på när man söker
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(10)
  }, [])

  /* Hämtar alla barer eller... */
  const { data: bars, loading } = useGetCollection("bars")

  /* Mittenpunkten på kartan när den först laddas in */
  const center = useMemo(() => ({ lat: 55.5918775, lng: 13.0078026 }), [])

  /* Om kartan inte är laddad returnerar vi detta */
  if (!isLoaded) return <h1 className="text-4xl">Loading...</h1>

  /* Om allt laddas korrekt, visa kartan */
  return (
    <>
      {/* Kartan har en klass, en default inzoomad-nivå, en, options. */}

      <Locate panTo={panTo} />
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="h-screen w-screen"
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {/* För varje bar mappar vi ut en marker med en ölikon och latituden/longituden från databasen */}
        {bars.map((marker) => (
          <Marker
            key={marker.name}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={BeerIcon}
            onClick={() => {
              setSelected(marker)
            }}
          />
        ))}

        {/* när användaren klickar på en knappnål så kommer en informationsruta upp */}
        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
            <div>
              <p>{selected.name}</p>
              <p>{selected.description}</p>
              <p>{selected.street}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  )
}

const Locate = ({ panTo }) => {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          () => {
            console.log(
              "slå på locations i inställningar, annars har användaren blockat och en toastify kanske"
            )
          }
        )
      }}
    >
      Hitta mig
    </button>
  )
}

export default BeerMap
