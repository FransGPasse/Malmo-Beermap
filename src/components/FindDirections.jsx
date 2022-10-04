import React, { useState } from "react"

/* Tar emot props från den markerade baren */
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
      className="btn btn-sm bg-primary m-2"
    >
      Find directions...
    </button>
  ) : (
    /* Om vi har koordinaterna, returnera en länk med vägbeskrivningen */
    <a
      href={`https://www.google.com/maps/dir/${myCoordinates.lat},${myCoordinates.lng}/${bar.name},+${bar.street}+${bar.city}`}
      className="btn btn-sm btn-link m-2"
    >
      Link to directions!
    </a>
  )
}

export default FindDirections
