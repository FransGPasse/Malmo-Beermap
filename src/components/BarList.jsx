import React, { useEffect } from "react"
import useGetCollection from "../hooks/useGetCollection"
import DotLoader from "react-spinners/DotLoader"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useAuthContext } from "../contexts/AuthContext"

const override = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}

const BarList = () => {
  const { searchParams } = useAuthContext()
  const stad = searchParams.get("city")

  /* Hämtar alla barer... */
  const { data, loading } = useGetCollection(
    "bars",
    //Check if we have a value in city, wich we only get if we searched for an adress
    //If it's empty get all bars that has a name that is not null, wich is everyone
    //This will make sure every bar is rendered when we load the page for the first time
    stad ? where("city", "==", stad) : where("name", "!=", null)
  )

  /* Om det fortfarande laddas returnerar vi detta */
  if (loading) return <DotLoader cssOverride={override} />

  return (
    <>
      <div className="h-full w-full overflow-y-scroll">
        {data.map((bar) => (
          <div className="h-24" key={bar.id}>
            <p>{bar.name}</p>
            <p>{bar.city}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default BarList
