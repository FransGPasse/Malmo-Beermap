import { useMemo, useState, useRef, useCallback, useEffect } from "react"

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
import { AiFillCloseSquare } from "react-icons/ai"
import { Listbox } from "@headlessui/react"

import LocateMe from "./LocateMe"
import SearchBar from "./SearchBar"
import BarList from "./BarList"
import FindDirections from "./FindDirections"

import libraries from "../assets/mapLibraries"
import "../assets/BarListStyling.css"

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  setMap: null,
}

const BeerMap = () => {
  /* State för om barlistan visas eller ej */
  const [barListShown, setBarListShown] = useState(false)

  /* State för användarens position */
  const [userLocation, setUserLocation] = useState("")

  /* Hämtar kartan */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  /* Hämtar alla barer... */
  const { data: bars } = useGetCollection("bars")

  console.log("här är bars: ", bars)

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
  }, [])

  // funktionen för att kartan ska gå till det ställe man klickar på när man söker
  const findDirectionsToBar = useCallback(({ lat, lng }) => {
    setUserLocation({ lat, lng })
    return userLocation
  }, [])

  /* Om kartan inte är laddad returnerar vi detta */
  if (!isLoaded) return <h1 className="text-4xl">Loading...</h1>

  /* Om allt laddas korrekt, visa kartan */

  return (
    <>
      <button
        className="absolute top-20 left-50 z-10  btn glass text-black"
        onClick={() =>
          barListShown ? setBarListShown(false) : setBarListShown(true)
        }
      >
        BARLISTAN
      </button>
      {/* Ifall barListShown är true */}
      {barListShown && (
        <main className="bar-list-popup shadow-md rounded-md">
          <div className="close-wrapper flex justify-end">
            <AiFillCloseSquare
              className="w-10 cursor-pointer"
              onClick={() =>
                barListShown ? setBarListShown(false) : setBarListShown(true)
              }
            />
          </div>
          <div className="filter-wrapper">
            <select className="select w-full max-w-xs">
              <option disabled selected>
                vilken typ av bar?
              </option>
              <option>Chill</option>
              <option>AW</option>
              <option>happy hour</option>
            </select>
          </div>
          <BarList />
        </main>
      )}
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
              {/* Funktion för att hitta vägbeskrivning till den valda baren */}
              <FindDirections bar={selected} />
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
    </>
  )
}

export default BeerMap
