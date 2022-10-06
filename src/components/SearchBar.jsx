import React from "react"
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
import BeerMapAPI from "../services/BeerMapAPI"
import { useAuthContext } from "../contexts/AuthContext"

const SearchBar = ({ searchedLocation }) => {
  /* Sätter det globala "state:t" till staden som vi sökt på. Har man sökt på en adress så sätter vi staden där adressen ligger i som state. */
  const { setSearchParams, filters, setCity } = useAuthContext()

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
    },
  })

  return (
    <div className="z-30 drop-shadow-lg hover:drop-shadow-xl ease-out duration-200">
      <Combobox
        className="z-30"
        onSelect={async (address) => {
          // två raderna nedanför tar bort sökförslagen när användaren klickat på en bar
          setValue(address, false)
          clearSuggestions()
          try {
            // här vill man väll ändra till att hämta lat och lng från den bar användaren klickat på som kommer från databasen
            const results = await getGeocode({ address })
            //Sätter location till första resultatet från sökningen
            const { lat, lng } = getLatLng(results[0])

            //Sätter den sökta locationen till lat och long
            searchedLocation({ lat, lng })

            //Get the city connected to the chosen coordinates
            const data = await BeerMapAPI.getAddress(lat, lng)

            //Sätter staden till adressen från datan
            await setCity(data)

            //Sätter URL:n till stad, lat, lng och filter
            setSearchParams({ city: data, lat, lng, filters })
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
          className="z-30 rounded-full p-1 text-center bg-primary"
        />
        <ComboboxPopover className="z-30">
          <ComboboxList className="z-30 bg-primary text-center space-y-2">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                  className="z-30 hover:outline outline-secondary outline-2"
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default SearchBar
