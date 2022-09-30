import React from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const Footer = () => {
  const { currentUser, userEmail } = useAuthContext()

  return (
    <footer className="footer fixed flex justify-between bottom-0 p-4 bg-primary">
      <p>BeerMap © 2022</p>
      {!currentUser ? (
        <Link as={Link} to="/adminlogin" className="hover:underline">
          <span>Admin</span>
        </Link>
      ) : (
        <Link as={Link} to="/adminlogin" className="hover:underline">
          <span>{userEmail}</span>
        </Link>
      )}
    </footer>
  )
}

export default Footer
