import React, { useEffect, useState } from "react"
import useFilterBarList from "../hooks/useFilterBarList"

const BarListObject = ({ data, filterObj }) => {
  const [filterMethod, setFilterMethod] = useState(filterObj)
  const dataObj = [...data]

  if (filterObj != filterMethod) {
    setFilterMethod(filterObj)
  }

  if (filterMethod === "highest") {
    dataObj.sort((a, b) => b.name.localeCompare(a.name))
  }

  if (filterMethod === "lowest") {
    dataObj.sort((a, b) => a.name.localeCompare(b.name))
  }

  return (
    <>
      {dataObj.map((bar) => (
        <>
          <div className="h-24" key={bar.id}>
            <p>{bar.name}</p>
            <p>{bar.city}</p>
          </div>
        </>
      ))}
    </>
  )
}

export default BarListObject
