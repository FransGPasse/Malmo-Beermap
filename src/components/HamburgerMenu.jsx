import React, { useState, useRef, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import "../assets/HamburgerMenu.css"
import Hamburger from "hamburger-react"
import { gsap } from "gsap"

const HamburgerMenu = () => {
  const [isOpen, setOpen] = useState(false)
  const containerRef = useRef()
  const timeline = gsap.timeline()

  useEffect(() => {
    if (isOpen) {
      console.log("öppna")
      gsap.from(containerRef.current, {
        height: 0,
        duration: 1,
        opacity: "0",
        ease: "expo.inOut",
      })
      gsap.from(
        document.querySelectorAll('[data-id="link"]'),
        {
          duration: 1,
          opacity: 0,
          y: 20,
          stagger: 0.1,
          ease: "expo.inOut",
        },
        "-=0.6"
      )
    }

    if (!isOpen) {
      console.log("stäng")
      timeline.timeScale(3)
      timeline.reverse()
    }
  }, [isOpen])

  return (
    <div className="sm:hidden">
      <Hamburger color="#fbbf24" toggled={isOpen} toggle={setOpen} />

      {isOpen && (
        <div
          ref={containerRef}
          className="fixed text-accent bg-primary menu-container"
        >
          <NavLink
            data-id="link"
            onClick={() => {
              clicked ? setClicked(false) : setClicked(true)
            }}
            as={Link}
            to="/admin"
          >
            Admin
          </NavLink>
          <NavLink
            data-id="link"
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
