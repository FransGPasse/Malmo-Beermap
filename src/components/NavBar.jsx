import React from "react"
import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="navbar bg-primary fixed z-10">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl text-accent">
          Malmö BeerMap 🍻
        </a>
      </div>
      <div className="flex-none">
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
    </div>
  )
}

export default NavBar
