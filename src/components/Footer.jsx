import React from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const Footer = () => {
  const { currentUser, userEmail } = useAuthContext()

  return (
    <>
      <footer className="flex w-full items-center flex-row justify-between px-10 py-5 fixed bottom-0">
        <span>© 2022 Malmö BeerMap</span>
        {!currentUser ? (
          <Link as={Link} to="/adminlogin" className="hover:underline">
            Admin
          </Link>
        ) : (
          <Link as={Link} to="/adminlogin" className="hover:underline">
            {userEmail}
          </Link>
        )}
      </footer>
    </>
  )
}

export default Footer
