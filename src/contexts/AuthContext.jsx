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
import { doc, setDoc } from "firebase/firestore"

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

  const signup = async (email, password, name, photo) => {
    //Create the user
    await createUserWithEmailAndPassword(auth, email, password)

    //Upload the photo to storage
    if (photo) {
      const fileRef = ref(
        storage,
        `profilepictures/${auth.currentUser.email}/${photo.name}`
      )

      console.log("auth.currentUser", auth.currentUser)
      console.log("Photo", photo)
      console.log("fileRef", fileRef)
      //Upload the profile picture to storage
      const uploadResult = await uploadBytes(fileRef, photo)

      console.log("uploadResult", uploadResult)

      //Get URL
      const photoURL = await getDownloadURL(uploadResult.ref)
      console.log("photoURL", photoURL)

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setUserEmail(user?.email)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const contextValues = {
    login,
    logout,
    signup,
    resetPassword,
    currentUser,
    userEmail,
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
