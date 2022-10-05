import React from "react"
import BarList from "./BarList"
import { useAuthContext } from "../contexts/AuthContext"

import { AiFillCloseCircle } from "react-icons/ai"

const BarButton = () => {
  const { barListShown, setBarListShown } = useAuthContext()

  return (
    <>
      <button
        className="z-40 btn btn-accent"
        onClick={() =>
          barListShown ? setBarListShown(false) : setBarListShown(true)
        }
      >
        LIST OF BARS
      </button>
      {/* Ifall barListShown är true */}
      {barListShown && (
        <div className="fixed z-40 h-2/3 w-2/3 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded-md p-3">
          <button
            onClick={() =>
              barListShown ? setBarListShown(false) : setBarListShown(true)
            }
            className="w-full flex justify-end"
          >
            <AiFillCloseCircle className="hover:text-primary text-2xl" />
          </button>
          <BarList />
        </div>
      )}
    </>
  )
}

export default BarButton
