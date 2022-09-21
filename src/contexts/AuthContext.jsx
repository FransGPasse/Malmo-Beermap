import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { auth, storage } from "../firebase"

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

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
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
