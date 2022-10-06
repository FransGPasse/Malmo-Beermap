import React, { useState } from "react"
import useGetCollection from "../hooks/useGetCollection"
import DotLoader from "react-spinners/DotLoader"
import { where } from "firebase/firestore"
import { useAuthContext } from "../contexts/AuthContext"
import BarListObject from "../components/BarListObject"
import { useEffect, useRef } from "react"

const override = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}

const BarList = () => {
  const { searchParams } = useAuthContext()
  const city = searchParams.get("city")
  const [option, setOption] = useState()

  function handleChange(event) {
    setOption(event.target.value)
    console.log(option)
  }

  /* Hämtar alla barer... */
  const { data, loading } = useGetCollection(
    "bars",
    //Check if we have a value in city, wich we only get if we searched for an adress
    //If it's empty get all bars that has a name that is not null, wich is everyone
    //This will make sure every bar is rendered when we load the page for the first time
    city ? where("city", "==", city) : where("name", "!=", null)
  )

  /* Om det fortfarande laddas returnerar vi detta */
  if (loading) return <DotLoader cssOverride={override} />

  return (
    <>
      <div className="h-full w-full overflow-y-scroll">
        <select
          className="select select-bordered w-full max-w-xs"
          name="option"
          defaultValue={"DEFAULT"}
          onChange={handleChange}
        >
          <option value="DEFAULT" disabled>
            Sort alphabetically
          </option>
          <option value="highest">Ö-A</option>
          <option value="lowest">A-Ö</option>
        </select>

        <BarListObject data={data} filterObj={option} />
      </div>
    </>
  )
}

export default BarList
