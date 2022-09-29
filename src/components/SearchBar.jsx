import React from "react"
import "../assets/mapStyling.css"
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

const SearchBar = ({ searchedLocation }) => {
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
      region: "se",
      bounds: 500 * 1000,
      componentRestrictions: true,
    },
  })

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
            //Sätter location till första resultatet från sökningen
            const { lat, lng } = getLatLng(results[0])
            searchedLocation({ lat, lng })
          } catch (error) {
            // kanske en toastify här istället?
            console.log("Error: ", error)
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          disabled={!ready}
          placeholder="Search for a bar..."
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default SearchBar
