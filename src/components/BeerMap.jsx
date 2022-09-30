import { useMemo, useState, useRef, useCallback, useEffect } from "react"
import { ImLocation } from "react-icons/im"
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindowF,
  MarkerClusterer,
} from "@react-google-maps/api"

import mapStyles from "../assets/mapStyles"
import BeerIcon from "../assets/images/beer-icon.png"
import useGetCollection from "../hooks/useGetCollection"
import { Link, useNavigate } from "react-router-dom"

import LocateMe from "./LocateMe"
import SearchBar from "./SearchBar"

import libraries from "../assets/mapLibraries"

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  setMap: null,
}

const BeerMap = () => {
  const [userLocation, setUserLocation] = useState("")
  /* Hämtar kartan */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  /* Hämtar alla barer... */
  const { data: bars } = useGetCollection("bars")

  /* Mittenpunkten på kartan när den först laddas in */
  const center = useMemo(() => ({ lat: 55.5918775, lng: 13.0078026 }), [])

  // här sparas den baren som användaren har klickat på och vill ha mer information om
  const [selected, setSelected] = useState(null)

  // referens till kartan
  const mapRef = useRef()

  // callback som skickas när kartan laddas, assignas sedan till mapRef för att slippa omladdning av kartan och otrevlig användarupplevelse
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  //När man klickar på kartan så sätter vi selected till null vilket slutar visa öppna InfoWindows
  const onMapClick = () => {
    setSelected(null)
  }

  // funktionen för att kartan ska gå till det ställe man klickar på när man söker
  const panToLocation = useCallback(({ lat, lng }) => {
    setUserLocation({ lat, lng })
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(17)
    console.log("här har vi lat:", lat + " och här har vi lng:", lng)
  }, [])
  console.log("panToLocation", userLocation)

  /* Om kartan inte är laddad returnerar vi detta */
  if (!isLoaded) return <h1 className="text-4xl">Loading...</h1>

  /* Om allt laddas korrekt, visa kartan */
  return (
    <>
      {/* Funktion för att hitta användarens nuvarande position */}
      <LocateMe myLocation={panToLocation} />
      {/* Funktion för att hitta en sökt position */}
      <SearchBar searchedLocation={panToLocation} />

      <GoogleMap
        //Kartan har en klass, en default inzoomad-nivå och options.
        zoom={13}
        center={center}
        mapContainerClassName="w-screen h-screen overflow-hidden"
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {/* För varje bar mappar vi ut en marker med en ölikon på latituden/longituden från databasen */}
        {bars.map((marker) => (
          <Marker
            key={marker.name}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={BeerIcon}
            animation={2}
            onClick={() => {
              setSelected(marker)
            }}
            className="hover:-translate-y-2"
          />
        ))}

        {userLocation && (
          <Marker position={{ lat: userLocation.lat, lng: userLocation.lng }} />
        )}

        {/* När användaren klickar på en knappnål så kommer en informationsruta upp */}
        {selected ? (
          //InfoWindowF eftersom att vi renderade ett extra, tomt, infowindow annars p.g.a Strict Mode
          <InfoWindowF
            position={{ lat: selected.lat, lng: selected.lng }}
            //När vi klickar på krysset för att stänga infofönstret så blir selected null
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div>
              <p className="text-xl">{selected.name}</p>
              <p className="italic mb-1">{selected.street}</p>
              <p>{selected.description}</p>
              {/* Link to google maps, seems incorrect though */}
              {/* <a
                className="text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                type="button"
                href={`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${selected.name},+${selected.street}+${selected.city}`}
              >
                Vägbeskrivning
              </a> */}
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
    </>
  )
}

export default BeerMap
