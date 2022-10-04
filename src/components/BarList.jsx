import React, { useEffect, useState } from "react"
import useGetCollection from "../hooks/useGetCollection"
import useFilterBarList from "../hooks/useFilterBarList"
import DotLoader from "react-spinners/DotLoader"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useAuthContext } from "../contexts/AuthContext"
import { Listbox } from "@headlessui/react"
import BarListObject from "../components/BarListObject"

const override = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}

const BarList = () => {
  const [option, setOption] = useState()
  const { city } = useAuthContext()

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
        <select name="option" defaultValue={"DEFAULT"} onChange={handleChange}>
          <option value="DEFAULT" disabled>
            tryck för att filtrera pls
          </option>
          <option value="highest">highest</option>
          <option value="lowest">lowest</option>
        </select>

        <BarListObject data={data} filterObj={option} />
      </div>
    </>
  )
}

export default BarList
