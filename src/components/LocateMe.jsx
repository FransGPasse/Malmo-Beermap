import React from "react"
import "../assets/mapStyling.css"

const LocateMe = ({ myLocation }) => {
  return (
    <button
      className="locateme-position"
      onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
          myLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        })
      }}
    >
      Find my position
    </button>
  )
}

export default LocateMe
