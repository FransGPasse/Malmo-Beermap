import React from "react"
import { ImLocation } from "react-icons/im"

const LocateMe = ({ myLocation }) => {
  return (
    <button
      className="z-10 text-primary p-2 font-bold flex ease-linear duration-100 hover:underline hover:scale-105"
      onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
          myLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        })
      }}
    >
      Find my location <ImLocation className="text-2xl" />
    </button>
  )
}

export default LocateMe
