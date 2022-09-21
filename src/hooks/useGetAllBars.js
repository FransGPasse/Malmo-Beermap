import { useEffect, useState } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../firebase"

//Här har vi vår "realtidsuppdaterare" som lyssnar på ändringar i databasen så länge komponenten som använder den är mountad. Den tar emot referensen till samlingen i databasen samt spreadar de queryConstraints som kommer med, d.v.s sortera efter "title" eller "completed" o.s.v
const useGetAllBars = (col, ...queryConstraints) => {
  //Sätter data-state till null från början
  const [data, setData] = useState([])
  //...Och loading till true
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //Hämtar referensen till samlingen
    const colRef = collection(db, col)
    //Skriver queryn med databasinstansen och de queryConstraints som vi skickat in, t.ex. sortera efter titel
    const queryRef = query(colRef, ...queryConstraints)

    //Subscribar till ändringar på dokumentet och lyssnar så länge komponenten som kallar på denna hooken är mountad
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        return {
          //Sätter datan med id och spreadar sedan datan till objektet
          id: doc.id,
          ...doc.data(),
        }
      })

      //Sätter docs till datan från onSnapshot
      setData(docs)

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

export default useGetAllBars
