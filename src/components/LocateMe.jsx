import React from "react"

const LocateMe = ({ myLocation }) => {
  return (
    <button
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
