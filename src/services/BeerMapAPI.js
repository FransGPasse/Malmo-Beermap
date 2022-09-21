import axios from "axios"

const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="

//Get the lat and long for place
const getCoordinates = async (street, city) => {
  const res = await axios.get(`${BASE_URL}${street} ${city}&key=${KEY}`)
  console.log(res.data.results[0].geometry)
  return res.data.results[0].geometry
}

const functions = {
  getCoordinates,
}

export default functions
