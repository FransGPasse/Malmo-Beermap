import React, { useEffect, useState } from "react"
import useFilterBarList from "../hooks/useFilterBarList"

const BarListObject = ({ data, filterObj }) => {
  const [filterMethod, setFilterMethod] = useState(filterObj)
  const dataObj = [...data]

  console.log(data)

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
          <div className="h-24 flex justify-center flex-col" key={bar.id}>
            <div>
              <p className="font-bold text-black">{bar.name}</p>
              <p className="text-black">{bar.city}</p>
            </div>
            <div className="flex items-center">
              <p>{bar.description}</p>
            </div>
          </div>
        </>
      ))}
    </>
  )
}

export default BarListObject
