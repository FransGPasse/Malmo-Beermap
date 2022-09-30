import React from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const Footer = () => {
  const { currentUser, userEmail } = useAuthContext()

  return (
<<<<<<< HEAD
    <footer className="footer fixed bottom-0 items-center p-4 bg-base-100 text-neutral-content">
=======
    <footer className="footer sticky bottom-0 items-center p-4 bg-primary text-neutral-content">
>>>>>>> main
      <div className="items-center grid-flow-col">
        <p>BeerMap © 2022</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        {!currentUser ? (
          <Link as={Link} to="/adminlogin" className="hover:underline">
            <span>Admin</span>
          </Link>
        ) : (
          <Link as={Link} to="/adminlogin" className="hover:underline">
            <span>{userEmail}</span>
          </Link>
        )}
      </div>
    </footer>
  )
}

export default Footer
