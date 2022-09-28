import React, { useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { Link, NavLink } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import useGetDocument from "../hooks/useGetDocument"
import { useEffect } from "react"

const NavBar = () => {
  //Kontextet för om man är inloggad eller ej
  const { currentUser, loading, admin } = useAuthContext()
  console.log(currentUser)
  useEffect(() => {
    if (admin) {
      console.log("INFO FROM NAV", admin)
    }
  }, [])

  return (
    <Menu>
      {/* Open menu button */}
      <Menu.Button className="fixed top-10 right-10 text-white space-y-2 flex flex-col items-center">
        <span className="block h-1 w-10 bg-white rounded-xl"></span>
        <span className="block h-1 w-10 bg-white rounded-xl"></span>
        <span className="block h-1 w-10 bg-white rounded-xl"></span>
      </Menu.Button>

      {/* Use the `Transition` component. */}
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-100 opacity-0"
      >
        {/* Close menu button */}
        <Menu.Button className="absolute top-6 right-5 z-10  text-white space-y-2 flex flex-col items-center p-4">
          <span className="block h-1 w-12 bg-white rounded-xl rotate-45 translate-y-3"></span>
          <span className="block h-1 w-12 bg-white rounded-xl -rotate-45"></span>
        </Menu.Button>
        <Menu.Items className="flex flex-col items-center fixed right-0  bg-gray-800 text-white w-1/2 h-screen md:w-1/3 lg:w-1/4 xl:w-1/6 space-y-24">
          <Menu.Item>
            {({ active }) => (
              <NavLink
                className={`${active && "underline"} mt-28`}
                as={Link}
                to="/"
              >
                Home
              </NavLink>
            )}
          </Menu.Item>
          {admin && (
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  className={`${active && "underline"}`}
                  as={Link}
                  to="/admin"
                >
                  Admin
                </NavLink>
              )}
            </Menu.Item>
          )}
          <Menu.Item>
            {({ active }) => (
              <NavLink
                className={`${active && "underline"}`}
                as={Link}
                to="/about"
              >
                About
              </NavLink>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default NavBar
