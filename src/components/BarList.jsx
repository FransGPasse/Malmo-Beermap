import React from "react"
import BarCard from "./BarCard"
import useGetCollection from "../hooks/useGetCollection"

const BarList = () => {
  /* Hämtar alla barer... */
  const { data, loading } = useGetCollection("bars")

  if (!loading) {
    console.log("Här är bars ifrån BarList: ", data)
  }

  /* Om det fortfarande laddas returnerar vi detta */
  if (loading) return <h1 className="text-4xl">Loading...</h1>

  return (
    <div className="grid items-center justify-center col-span-2 gap-2 lg:col-span-4">
      {data.map((bar) => (
        <BarCard key={bar.id} data={bar} />
      ))}
    </div>
  )
}

export default BarList
