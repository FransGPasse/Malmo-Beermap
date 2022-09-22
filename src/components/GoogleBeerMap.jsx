import { useState, useCallback, useRef } from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
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

import mapStyles from "../assets/mapStyles"

// dessa variabler ligger utanför komponenten för att slippa att kartan buggar sig när react kollar ifall komponenten behöver renderas om

const libraries = ["places"]
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}
const center = {
  lat: 55.60498,
  lng: 13.003822,
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

const GoogleBeerMap = () => {
  // script som körs när man laddar in kartan
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  // sparar marker på click
  const [markers, setMarkers] = useState([])
  // här sparas den baren som användaren har klickat på och vill ha mer information om
  const [selected, setSelected] = useState(null)

  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ])
  }, [])

  // referens till kartan
  const mapRef = useRef()
  // callback som skickas när kartan laddas, assignas sedan till mapRef för att slippa omladdning av kartan och otrevlig användarupplevelse
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  // funktionen för att kartan ska gå till det ställe man klickar på när man söker
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(16)
  }, [])

  // vid error eller ifall kartan fortfarande laddar
  if (loadError) return "error loading the map"
  if (!isLoaded) return "still loading"

  return (
    <>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {/* gör en map över markers vilket kommer vara barerna */}
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker)
            }}
          />
        ))}
        {/* när användaren klickar på en knappnål så kommer en informationsruta upp */}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div>
              <p>barens namn</p>
              <p>information om baren</p>
              <p>lite ikoner kanske</p>
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
      hitta mig
    </button>
  )
}

const Search = ({ panTo }) => {
  // ready kollar ifall alla google-scripts är redo, vilket de är genom loadscript
  // value är värdet som användaren håller på att skriva in i sökboxen
  // suggestions är då förslagen baserat på googles api här
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 55.60498, lng: () => 13.003822 }, // vart sökningen baseras, satt den på malmö just nu, får bli user här sedan
      radius: 200 * 1000, // hur stort sökområde, den är satt på 200 km nu men ska givetvis ändras
    },
  })
  // console.log på sökresultat nedanför
  // console.log(data)
  return (
    <div className="searchContainer">
      <Combobox
        onSelect={async (address) => {
          // två raderna nedanför tar bort sökförslagen när användaren klickat på en bar
          setValue(address, false)
          clearSuggestions()
          try {
            // här vill man väll ändra till att hämta lat och lng från den bar användaren klickat på som kommer från databasen
            const results = await getGeocode({ address })
            const { lat, lng } = await getLatLng(results[0])
            panTo({ lat, lng })
          } catch (error) {
            // kanske en toastify här istället?
            console.log("error")
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          disabled={!ready}
          placeholder="skriv i en address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {/* ifall status är OK från suggestions, så kan man map över datan med förslag */}
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default GoogleBeerMap
