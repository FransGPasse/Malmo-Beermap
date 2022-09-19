import React from "react"
import { Menu, Transition } from "@headlessui/react"
import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <Menu>
      <Menu.Button>More</Menu.Button>

      {/* Use the `Transition` component. */}
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="flex flex-col items-center justify-center">
          <Menu.Item>
            {({ active }) => (
              <div
                className={`${active && "bg-blue-500"}`}
                as={NavLink}
                end
                to="/suggestions"
              >
                Suggestions
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && "bg-blue-500"}`}>About</a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default NavBar
