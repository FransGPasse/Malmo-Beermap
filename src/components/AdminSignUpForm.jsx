import React, { useRef, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AdminSignUpForm = () => {
  const emailRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef()
  const photoRef = useRef()
  const [photo, setPhoto] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { signup } = useAuthContext()
  const navigate = useNavigate()

  const toastError = () =>
    toast.error("Something went wrong!", {
      position: "top-right",
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

  const handleFileChange = (e) => {
    if (!e.target.files.length) {
      setPhoto(null)
      return
    }
    setPhoto(e.target.files[0])
    console.log("Chosen photo", e.target.files[0])
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

      //Signar upp användaren med värdena från input-referenserna
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        photo
      )

      /*       //Sätter displayname och foto
      await setDisplayNameAndPhoto(displayNameRef.current.value, photo) */

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

  return (
    <>
      <div className="grid place-items-center h-screen">
        <div>
          <h1 className="text-4xl text-center">Sign up</h1>

          {/* Visar errormeddelandet vid error */}
          {error && <div className="text-4xl">Error: {error}</div>}

          <form className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-email"
                >
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Name"
                  ref={nameRef}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-email"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-email"
                >
                  Photo
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="file"
                  ref={photoRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <Link
                  className="text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  type="button"
                  to="/adminlogin"
                >
                  Login
                </Link>
                <button
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AdminSignUpForm
