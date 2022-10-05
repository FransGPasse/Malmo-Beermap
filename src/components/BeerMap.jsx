import { useMemo, useState, useRef, useCallback } from "react"

import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api"

import mapStyles from "../assets/mapStyles"
import BeerIcon from "../assets/images/beer-icon.png"
import useGetCollection from "../hooks/useGetCollection"

import LocateMe from "./LocateMe"
import SearchBar from "./SearchBar"
import BarList from "./BarList"
import FindDirections from "./FindDirections"

import { AiFillCloseCircle } from "react-icons/ai"

import libraries from "../assets/mapLibraries"
import { useAuthContext } from "../contexts/AuthContext"

const BeerMap = () => {
  /* State för den stad som användaren sökt efter eller befinner sig i */
  const { searchParams, city } = useAuthContext()

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

  const latUrl = searchParams.get("lat")
  const lngUrl = searchParams.get("lng")

  /* Mittenpunkten på kartan när den först laddas in */
  const center = useMemo(
    () => ({ lat: Number(latUrl), lng: Number(lngUrl) }),
    []
  )

  // här sparas den baren som användaren har klickat på och vill ha mer information om
  const [selected, setSelected] = useState(null)

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

  /* Om kartan inte är laddad returnerar vi detta */
  if (!isLoaded) return <h1 className="text-4xl">Loading...</h1>

  return (
    <>
      {/* Om barlistan visas, lägg en div som blurrar kartan */}
      {barListShown && (
        <div className="fixed h-screen w-screen backdrop-blur-sm z-20 bg-gray-600/10"></div>
      )}

      <div className="absolute flex flex-col justify-center items-center top-20 space-y-2 w-full sm:flex-row sm:justify-between sm:px-10 sm:space-y-0">
        {/* Funktion och komponent för att hitta den sökta position */}
        <SearchBar searchedLocation={panToSearchedLoaction} />
        <button
          className="z-30 btn btn-accent"
          onClick={() =>
            barListShown ? setBarListShown(false) : setBarListShown(true)
          }
        >
          BARLISTAN
        </button>
        {/* Ifall barListShown är true */}
        {barListShown && (
          <div className="fixed z-30 h-2/3 w-2/3 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded-md p-3">
            <button
              onClick={() =>
                barListShown ? setBarListShown(false) : setBarListShown(true)
              }
              className="w-full flex justify-end"
            >
              <AiFillCloseCircle className="hover:text-primary text-2xl" />
            </button>
            <BarList />
          </div>
        )}
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
        {!city
          ? bars.map((marker) => (
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
            ))
          : /* Om city däremot inte är null så filtrerar vi våra markörer efter stadens namn och mappar sedan ut en markör för varje bar i den staden */
            bars
              .filter((marker) => marker.city === city)
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
                  className="hover:-translate-y-2"
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
                <div className="collapse-title bg-primary text-primary-content peer-checked:bg-primary peer-checked:text-secondary-content text-lg text-center">
                  More info
                </div>
                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-primary peer-checked:text-secondary-content grid grid-cols-2">
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
