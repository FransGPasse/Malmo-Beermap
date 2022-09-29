import { useMemo, useState, useRef, useCallback } from "react"

import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindowF,
  MarkerClusterer,
} from "@react-google-maps/api"

import React from "react"

import mapStyles from "../assets/mapStyles"
import BeerIcon from "../assets/images/beer-icon.png"
import useGetCollection from "../hooks/useGetCollection"

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
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(17)
  }, [])

  /* Om kartan inte är laddad returnerar vi detta */
  if (!isLoaded) return <h1 className="text-4xl">Loading...</h1>

  /* Om allt laddas korrekt, visa kartan */
  return (
    <>
      {/* Funktion för att hitta användarens nuvarande position */}
      <LocateMe myLocation={panToLocation} />

      <SearchBar searchedLocation={panToLocation} />

      <GoogleMap
        //Kartan har en klass, en default inzoomad-nivå och options.
        zoom={13}
        center={center}
        mapContainerClassName="w-screen h-screen"
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
          />
        ))}

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
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
    </>
  )
}

export default BeerMap
