import React, { useEffect, useRef, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AdminLoginForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login, currentUser, logout } = useAuthContext()
  const navigate = useNavigate()

  const toastError = () =>
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const toastSuccess = () => {
    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  //Funktion som hanterar när vårt formulär submittas
  const handleSubmit = async (e) => {
    //Stoppar default-beteendet
    e.preventDefault()

    //Och sätter error till null
    setError(null)

    //Försöker signa upp användaren med inputfältens current value
    try {
      //Disable:ar submit-knappen
      setLoading(true)

      //Loggar in användaren med värdena från input-referenserna
      await login(emailRef.current.value, passwordRef.current.value)

      toastSuccess()

      //Navigerar till hemskärmen
      navigate("/")

      //Felhantering
    } catch (err) {
      setError(err.message)
      //Enable:ar submit-knappen
      setLoading(false)

      toastError()
    }
  }

  //Funktion för att logga ut vår användare
  const logoutUser = async () => {
    await logout()
    navigate("/")
    window.location.reload()
  }

  return (
    <>
      <div className="grid place-items-center h-screen bg-secondary">
        <div>
          <h1 className="text-4xl text-center mb-4 text-primary log-in-stamp opacity-100">
            Log in
          </h1>

          <form className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-primary font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-email"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="border-b focus:outline-none bg-secondary text-primary text-sm  block w-full p-2.5  dark:border-gray-600 dark:placeholder-primary dark:text-primary"
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-primary font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="border-b focus:outline-none bg-secondary text-primary text-sm  block w-full p-2.5  dark:border-gray-600 dark:placeholder-primary dark:text-primary "
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                {!currentUser ? (
                  <button
                    className="text-white bg-primary hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    type="button"
                    onClick={logoutUser}
                    disabled={loading}
                  >
                    Sign out
                  </button>
                )}

                <Link
                  className="text-accent focus:outline-none text-xl focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  type="button"
                  to="/adminsignup"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AdminLoginForm
