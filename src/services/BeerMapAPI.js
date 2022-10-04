import axios from "axios"

const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?"

//Get the lat and long for place
const getCoordinates = async (street, city) => {
  const res = await axios.get(`${BASE_URL}address=${street} ${city}&key=${KEY}`)
  console.log(res.data.results[0].geometry)
  return res.data.results[0].geometry
}

//Get the adress for a certain latitude and longitude
const getAddress = async (lat, lng) => {
  const res = await axios.get(`${BASE_URL}latlng=${lat},${lng}&key=${KEY}`)
  console.log("getAddress", res.data.results[0].address_components)
  const cityObject = res.data.results[0].address_components.filter(
    (info) => info.types[0] === "postal_town"
  )
  const city = cityObject[0].long_name
  return city
}

//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

const functions = {
  getCoordinates,
  getAddress,
}

export default functions
