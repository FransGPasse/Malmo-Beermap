import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

//Custom hook som tar emot två argument (namnet på en collection i Firebase och ID:t på dokumentet vi vill hämta)
const useGetDocument = (col, id) => {
  //Sätter data-state till null från början
  const [data, setData] = useState([])

  //...Och loading till true
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //Hämtar referensen till dokumentet
    const ref = doc(db, col, id)

    //Subscribar till ändringar på dokumentet och lyssnar så länge komponenten som kallar på denna hooken är mountad
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      //Sätter datan med id och spreadar sedan datan till objektet
      setData({
        id: snapshot.id,
        ...snapshot.data(),
      })
      //Sätter loading till false
      setLoading(false)
    })

    //Och returnerar sedan unsubscribe så fort komponenten unmountats
    return unsubscribe

    //Tom dependency array så vi bara kör när komponenten mountas första gången
  }, [])

  return {
    data,
    loading,
  }
}

export default useGetDocument
