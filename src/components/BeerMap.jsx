import { useEffect, useMemo, useState, useRef, useCallback } from "react"
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api"
import useGetAllBars from "../hooks/useGetAllBars"
import mapStyles from "../assets/mapStyles"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"

const libraries = ["places"]
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

const BeerMap = () => {
  /* Hämtar kartan */
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  /* Hämtar alla barer och... */
  const { data: bars, loading } = useGetAllBars("bars")

  /* ...Konsol-loggar */
  console.log("Här är barerna: ", bars)

  /* Funktioner för sök och användarens plats */
  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.curent = map
  }, [])

  /* Mittenpunkten på kartan när den först laddas in */
  const center = useMemo(() => ({ lat: 55.5918775, lng: 13.0078026 }), [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(14)
  }, [])

  /* Om kartan inte är laddad returnerar vi detta */
  if (!isLoaded) return <h1 className="text-4xl">Loading...</h1>
  if (loadError) return "error loading maps..."

  /* Om allt laddas korrekt, visa kartan */
  return (
    <>
      <Locate panTo={panTo} />
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="h-3/6 w-3/6"
        options={options}
        onLoad={onMapLoad}
      >
        {/*         <MarkerClusterer></MarkerClusterer> */}
        <Marker position={center} />
      </GoogleMap>

      <Search />
    </>
  )
}

/* hitta användarens location */
function Locate({ panTo }) {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("din position", position)
          },
          () => null
        )
      }}
    >
      HITTA MIG
    </button>
  )
}

/* funktion för sök */
const Search = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 55.5918775, lng: () => 13.0078026 }, // vart sökfunktionen ska baseras ifrån
      radius: 200 * 1000, // hittar resultat inom 200km, får väll justeras här
    },
  })
  return (
    <Combobox
      onSelect={(address) => {
        console.log(address)
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        disabled={!ready}
        placeholder="Enter an address..."
      />
      <ComboboxPopover>
        {status === "OK" &&
          data.map((id, description) => (
            <ComboboxOption key={id} value={description} />
          ))}
      </ComboboxPopover>
    </Combobox>
  )
}

export default BeerMap
