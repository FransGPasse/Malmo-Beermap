import React from "react"
import useGetCollection from "../hooks/useGetCollection"
import "../assets/BarListStyling.css"
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
  const { city } = useAuthContext()
  /* Hämtar alla barer... */
  const { data, loading } = useGetCollection("bars", where("city", "==", city))

  /* Om det fortfarande laddas returnerar vi detta */
  if (loading) return <DotLoader cssOverride={override} />

  return (
    <>
      <div className="bar-cards-container overflow-y-scroll">
        {data.map((bar) => (
          <div className="bar-card" key={bar.id}>
            <p>{bar.name}</p>
            <p>{bar.city}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default BarList
