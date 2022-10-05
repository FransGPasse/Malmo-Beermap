import React from "react"
import { ImLocation } from "react-icons/im"
import { useAuthContext } from "../contexts/AuthContext"
import BeerMapAPI from "../services/BeerMapAPI"

const LocateMe = ({ myLocation }) => {
  const { setCity } = useAuthContext()
  const { setSearchParams } = useAuthContext()

  return (
    <button
      className="z-10 text-primary p-2 font-bold flex ease-linear duration-100 hover:underline hover:scale-105"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
          myLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          const data = await BeerMapAPI.getAddress(
            position.coords.latitude,
            position.coords.longitude
          )
          setCity(data)
          setSearchParams({
            city: data,
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
