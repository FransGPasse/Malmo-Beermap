import React from "react"
import BarCard from "./BarCard"
import { Listbox, Transition } from "@headlessui/react"
import useGetCollection from "../hooks/useGetCollection"
import "../assets/BarListStyling.css"
import DotLoader from "react-spinners/DotLoader"

const override = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}
const BarList = () => {
  /* Hämtar alla barer... */
  const { data, loading } = useGetCollection("bars")

  if (!loading) {
    console.log("Här är bars ifrån BarList: ", data)
  }

  /* Om det fortfarande laddas returnerar vi detta */
  if (loading) return <DotLoader cssOverride={override} />

  return (
    <>
      <div className="bar-cards-container overflow-y-scroll">
        {data.map((bar) => (
          <div className="bar-card">
            <p>{bar.name}</p>
            <p>{bar.city}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default BarList
