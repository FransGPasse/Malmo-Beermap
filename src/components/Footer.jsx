import React from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const Footer = () => {
  const { currentUser, userEmail } = useAuthContext()

  return (
    <>
      <footer className="fixed bottom-0 left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="#" className="hover:underline">
            BeerMap™
          </a>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link as={Link} to="/adminlogin" className="hover:underline">
              {!currentUser ? (
                <Link as={Link} to="/adminlogin" className="hover:underline">
                  <span>Admin</span>
                </Link>
              ) : (
                <Link as={Link} to="/adminlogin" className="hover:underline">
                  <span>{userEmail}</span>
                </Link>
              )}
            </Link>
          </li>
        </ul>
      </footer>
    </>
  )
}

export default Footer
