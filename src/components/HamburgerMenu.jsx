import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import "../assets/HamburgerMenu.css"
import Hamburger from "hamburger-react"
import { gsap } from "gsap"

const HamburgerMenu = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Hamburger color="#fbbf24" toggled={isOpen} toggle={setOpen} />

      {isOpen && (
        <ul
          className="text-accent bg-primary z-60 menu-container
        "
        >
          <li>
            <NavLink
              onClick={() => {
                clicked ? setClicked(false) : setClicked(true)
              }}
              as={Link}
              to="/admin"
            >
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                clicked ? setClicked(false) : setClicked(true)
              }}
              as={Link}
              to="/suggestions"
            >
              Suggest a bar
            </NavLink>
          </li>
        </ul>
      )}
    </>
  )
}

export default HamburgerMenu
