import { useMemo, useState, useRef, useCallback, useEffect } from "react"

import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api"

import mapStyles from "../assets/mapStyles"
import BeerIcon from "../assets/images/beer-icon.png"
import useGetCollection from "../hooks/useGetCollection"

import SearchBar from "./SearchBar"
import FilterDropdown from "./FilterDropdown"
import BarButton from "./BarButton"
import LocateMe from "./LocateMe"
import FindDirections from "./FindDirections"

import libraries from "../assets/mapLibraries"
import { useAuthContext } from "../contexts/AuthContext"
import { useEffect } from "react"

import { gsap } from "gsap"

const BeerMap = () => {
  const { searchParams, setSearchParams, setFilters, filters, barListShown } =
    useAuthContext()

  /* State för användarens position */
  const [userLocation, setUserLocation] = useState("")

  // här sparas den baren som användaren har klickat på och vill ha mer information om
  const [selected, setSelected] = useState(null)

  /* Hämtar kartan */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  /* Hämtar alla barer... */
  const { data: bars } = useGetCollection("bars")

  /* Hämtar latitud och longitud från URL:n om det finns en */
  const latUrl = searchParams.get("lat")
  const lngUrl = searchParams.get("lng")

  /* Hämtar staden från URL:n om det finns en */
  const city = searchParams.get("city")

  /* Mittenpunkten på kartan när den först laddas in */
  const center = useMemo(
    () => ({ lat: Number(latUrl), lng: Number(lngUrl) }),
    []
  )

  // referens till kartan
  const mapRef = useRef()

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    setMap: null,
  }

  // callback som skickas när kartan laddas, assignas sedan till mapRef för att slippa omladdning av kartan och otrevlig användarupplevelse
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  //När man klickar på kartan så sätter vi selected till null vilket slutar visa öppna InfoWindows
  const onMapClick = () => {
    setSelected(null)
  }

  // funktionen för att kartan ska gå till det ställe man klickar på när man söker
  const panToSearchedLoaction = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(17)
  }, [])

  //Funktion som sätter ut en markör på min position
  const panToMyLocation = useCallback(({ lat, lng }) => {
    setUserLocation({ lat, lng })
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(17)
  }, [])

  /* Sätter filter och våra searchParams när komponenten monteras */
  useEffect(() => {
    setFilters(filters)
    setSearchParams(searchParams)
  }, [filters, searchParams])

  /* Om kartan inte är laddad returnerar vi detta */
  if (!isLoaded) return <h1 className="text-4xl">Loading...</h1>

  if (barListShown) {
    console.log("hej")
  }

  if (!barListShown) {
    console.log("stäng")
  }

  console.log("här har vi type", filterType)
  console.log("här har vi type", filterProducts)

  return (
    <>
      {/* Om barlistan visas, lägg en div som blurrar kartan */}
      {barListShown && (
        <div
          ref={bgBlur}
          className="fixed h-screen w-screen z-40 backdrop-blur-sm bg-gray-600/10"
        ></div>
      )}

      <div className="absolute flex flex-col justify-between items-center px-10 top-20 w-full sm:grid sm:grid-flow-col sm:items-stretch">
        <div className="flex flex-col mt-2">
          {/* Funktion och komponent för att hitta den sökta position */}
          <SearchBar searchedLocation={panToSearchedLoaction} />

          <FilterDropdown />
        </div>

        {/* Funktion och komponent för listan med barer */}
        <BarButton />

        {/* Funktion för att hitta användarens nuvarande position */}
        <LocateMe myLocation={panToMyLocation} />
      </div>

      <GoogleMap
        //Kartan har en klass, en default inzoomad-nivå och options.
        zoom={13}
        center={center}
        mapContainerClassName="w-screen h-screen"
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {/* Om vi har vår användares position, sätt ut en vanlig markör där */}
        {userLocation && (
          <Marker position={{ lat: userLocation.lat, lng: userLocation.lng }} />
        )}

        {/* Om city är null (det vill säga om vi inte sökt på något eller hämtat vår position) så mappar vi ut en marker för varje bar med en ölikon på latituden/longituden från databasen */}
        {!filters
          ? bars.map((marker) => (
              <Marker
                key={marker.name}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={BeerIcon}
                animation={2}
                onClick={() => {
                  setSelected(marker)
                }}
              />
            ))
          : /* Om city däremot inte är null så filtrerar vi våra markörer efter stadens namn och mappar sedan ut en markör för varje bar i den staden */
            bars
              .filter(
                (marker) =>
                  marker.city == filters ||
                  marker.type == filters ||
                  marker.product == filters
              )
              .map((filteredMarker) => (
                <Marker
                  key={filteredMarker.name}
                  position={{
                    lat: filteredMarker.lat,
                    lng: filteredMarker.lng,
                  }}
                  icon={BeerIcon}
                  animation={2}
                  onClick={() => {
                    setSelected(filteredMarker)
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
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl">{selected.name}</p>
              <p className="italic mb-1">{selected.street}</p>
              <p>{selected.description}</p>
              {/* Funktionell komponent för att hitta vägbeskrivning till den valda baren */}
              <FindDirections bar={selected} />
              <div className="collapse collapse-arrow rounded-box">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary text-accent peer-checked:text-accent peer-checked:bg-primary text-lg text-center">
                  More info
                </div>
                <div className="collapse-content bg-primary text-accent peer-checked:bg-primary peer-checked:text-accent grid grid-cols-2">
                  <p>Type: {selected.type}</p>
                  <p>Cuisine: {selected.cuisine}</p>
                  <p>Email: {selected.email}</p>
                  <p>Facebook: {selected.fb}</p>
                  <p>Instagram: {selected.insta}</p>
                  <p>Phone number: {selected.phone}</p>
                </div>
              </div>
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
    </>
  )
}

export default BeerMap
