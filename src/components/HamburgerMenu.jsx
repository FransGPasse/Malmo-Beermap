import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import "../assets/HamburgerMenu.css"
import Hamburger from "hamburger-react"

const HamburgerMenu = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <Hamburger color="#fbbf24" toggled={isOpen} toggle={setOpen} />

      {isOpen && (
        <div className="fixed text-accent bg-primary menu-container">
          <NavLink
            onClick={() => {
              clicked ? setClicked(false) : setClicked(true)
            }}
            as={Link}
            to="/admin"
          >
            Admin
          </NavLink>
          <NavLink
            onClick={() => {
              clicked ? setClicked(false) : setClicked(true)
            }}
            as={Link}
            to="/suggestions"
          >
            Suggest a bar
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default HamburgerMenu
