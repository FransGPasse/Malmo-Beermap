import React, { useEffect, useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import HamburgerMenu from "./HamburgerMenu"
import { gsap } from "gsap"

const NavBar = () => {
  const menuRef = useRef()
  const timeline = gsap.timeline()
  const beerLogoTween = useRef()
  const menuTween = useRef()

  // tidslinjen för att animera ölglasen vid hover
  useEffect(() => {
    menuTween.current = gsap.to(beerLogoTween.current, {
      duration: 0.5,
      rotation: 20,
      paused: true,
    })
  }, [])

  // funktionerna för att spela animation vid hover
  const onMouseEnterHandler = () => {
    menuTween.current.play()
  }
  const onMouseLeaveHandler = () => {
    menuTween.current.reverse()
  }

  // funktioner för att animera vid mount
  useEffect(() => {
    gsap.from(document.querySelectorAll("menu a"), {
      opacity: 0,
      stagger: 0.5,
    })
  }, [])

  return (
    <div className="navbar bg-primary fixed z-50">
      <div ref={menuRef} className="flex-1">
        <a
          href="/"
          className="btn btn-ghost normal-case text-xl text-accent z-50"
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        >
          Malmö BeerMap{" "}
          <span className="pl-2" ref={beerLogoTween}>
            {" "}
            🍻
          </span>
        </a>
      </div>
      <div className="hidden sm:flex">
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
