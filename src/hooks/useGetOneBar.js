import React from "react"
import { useEffect, useState } from "react"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

function useGetOneBar(col, id) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    setLoading(true)
    // get reference to document in collection col with the chosen id
    const ref = doc(db, col, id)
    const unsubscribe = onSnapshot(ref, (doc) => {
      setData(doc.data())
      setLoading(false)
      return unsubscribe
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    data,
    loading,
  }
}

export default useGetOneBar
