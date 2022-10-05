import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import HamburgerMenu from "./HamburgerMenu"

const NavBar = () => {
  //Kontextet för om man är inloggad eller ej
  const { currentUser, loading, admin } = useAuthContext()

  return (
    <div className="navbar bg-primary fixed z-10">
      <div className="flex-1">
        <NavLink
          as={Link}
          to="/"
          className="btn btn-ghost normal-case text-xl text-accent"
        >
          Malmö BeerMap 🍻
        </NavLink>
      </div>
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <NavLink as={Link} to="/admin">
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink as={Link} to="/suggestions">
              Suggest a bar
            </NavLink>
          </li>
        </ul>
      </div>
      <HamburgerMenu />
    </div>
  )
}

export default NavBar
