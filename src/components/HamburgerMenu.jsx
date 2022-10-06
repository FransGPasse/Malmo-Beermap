import React, { useState, useRef, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import "../assets/HamburgerMenu.css"
import Hamburger from "hamburger-react"
import { gsap } from "gsap"

const HamburgerMenu = () => {
  const [isOpen, setOpen] = useState(false)
  const containerRef = useRef()
  const tl = useRef()
  const timeline = gsap.timeline()

  // console.log(isOpen)

  // animerar menyn beroende på ifall användaren klickat på menyn och isOpen är true eller false
  useEffect(() => {
    if (isOpen) {
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

    // ska reversa animationen på menyn när man stänger, buggar dock
    if (!isOpen) {
      // ska stängas tre gånger så snabbt
      timeline.timeScale(3)
      timeline.reverse()
    }
  }, [isOpen])

  return (
    <div className="sm:hidden">
      <Hamburger color="#fbbf24" toggled={isOpen} toggle={setOpen} rounded />

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
            onMouseEnter={(e) => {
              gsap.to(e.target, {
                opacity: 0.8,
                x: "5%",
              })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, {
                opacity: 1,
                x: 0,
              })
            }}
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
            onMouseEnter={(e) => {
              gsap.to(e.target, {
                opacity: 0.8,
                x: "5%",
              })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, {
                opacity: 1,
                x: 0,
              })
            }}
          >
            Suggest a bar
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default HamburgerMenu
