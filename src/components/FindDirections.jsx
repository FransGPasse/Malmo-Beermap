import React, { useState } from "react"

const FindDirections = ({ bar }) => {
  /* State för mina koordinater */
  const [myCoordinates, setMyCoordinates] = useState(null)

  /* Om vi inte har de ännu, returnera en knapp där vi hämtar dem */
  return !myCoordinates ? (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setMyCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        })
      }}
    >
      Find directions...
    </button>
  ) : (
    /* Om vi har koordinaterna, returnera en länk med vägbeskrivningen */
    <a
      href={`https://www.google.com/maps/dir/${myCoordinates.lat},${myCoordinates.lng}/${bar.name},+${bar.street}+${bar.city}`}
    >
      Link to directions!
    </a>
  )
}

export default FindDirections
