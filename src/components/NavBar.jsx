import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import useGetDocument from "../hooks/useGetDocument"
import { useEffect } from "react"

const NavBar = () => {
  //Kontextet för om man är inloggad eller ej
  const { currentUser, loading, admin } = useAuthContext()
  useEffect(() => {
    if (admin) {
      console.log("INFO FROM NAV", admin)
    }
  }, [])

  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <NavLink as={Link} to="/" className="btn btn-ghost normal-case text-xl">
          Malmö BeerMap 🍻
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <NavLink as={Link} to="/admin">
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink as={Link} to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink as={Link} to="/suggestions">
              Suggest a bar
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
