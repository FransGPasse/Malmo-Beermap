import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { auth, db, storage } from "../firebase"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { useSearchParams } from "react-router-dom"

//Skapar kontext med hjälp av hooken createContext
const AuthContext = createContext()

//Skapar funktionen useAuthContext som sätter variabeln Authcontext som useContext
const useAuthContext = () => {
  return useContext(AuthContext)
}

//Själva providern som vi ska wrappa kring appen för att ge den inloggade användaren admin-behörigheter
const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [loading, setLoading] = useState(false)
  const [admin, setAdmin] = useState(null)

  /* State för om barlistan visas eller ej */
  const [barListShown, setBarListShown] = useState(false)

  /* States för de olika filtrerna */
  const [city, setCity] = useState("")
  const [types, setTypes] = useState("")
  const [products, setProducts] = useState("")

  /* Variabel för den ursprungliga URL:n */
  const URL = { lat: 55.5918775, lng: 13.0078026 }

  /* Sätter våra searchParams till den ursprungliga URL:n */
  const [searchParams, setSearchParams] = useSearchParams(URL)

  /* State för samtliga filters samlade i ett */
  const [filters, setFilters] = useState(searchParams.get("filters"))

  const signup = async (email, password, name, photo) => {
    //Create the user
    await createUserWithEmailAndPassword(auth, email, password)

    //Upload the photo to storage
    if (photo) {
      const fileRef = ref(
        storage,
        `profilepictures/${auth.currentUser.email}/${photo.name}`
      )

      //Upload the profile picture to storage
      const uploadResult = await uploadBytes(fileRef, photo)

      //Get URL
      const photoURL = await getDownloadURL(uploadResult.ref)

      if (photoURL) {
        //Create a user document
        const docRef = doc(db, "users", auth.currentUser.uid)
        await setDoc(docRef, {
          name: name,
          email: email,
          profilePicture: photoURL,
          admin: false,
        })
      }
    } else {
      const docRef = doc(db, "users", auth.currentUser.uid)
      await setDoc(docRef, {
        name: name,
        email: email,
        profilePicture: "",
        admin: false,
      })
    }
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const getInfo = async (user) => {
    const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setAdmin(docSnap.data().admin)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        setUserEmail(user?.email)
        getInfo(user)
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const contextValues = {
    login,
    logout,
    signup,
    admin,
    resetPassword,
    currentUser,
    userEmail,
    setSearchParams,
    searchParams,
    barListShown,
    setBarListShown,
    city,
    setCity,
    products,
    setProducts,
    types,
    setTypes,
    filters,
    setFilters,
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {loading ? (
        <div>
          <h1>Loading admin status...</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider as default, useAuthContext }
