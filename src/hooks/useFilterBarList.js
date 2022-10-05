import React from "react"

const useFilterBarList = (datan, metod) => {
  if ("highest") {
    return dataObj.sort((a, b) => b.name.localeCompare(a.name))
  }

  if ("lowest") {
    return dataObj.sort((a, b) => a.name.localeCompare(b.name))
  }
}

export default useFilterBarList
