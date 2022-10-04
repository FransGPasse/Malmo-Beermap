import React from "react"
import useGetCollection from "../hooks/useGetCollection"
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
