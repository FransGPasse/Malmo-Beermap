import React, { useEffect } from "react"
import { useAuthContext } from "../contexts/AuthContext"

const FilterDropdown = () => {
  const { setSearchParams, filters, setFilters, city } = useAuthContext()

  const types = [
    "Divebar",
    "Cocktailbar",
    "Microbrewery",
    "Sportsbar",
    "Karaokebar",
  ]
  const products = ["Craftbeer", "Local beer", "Cocktails", "Natural wines"]

  /* När vi klickar på en produkt, sätt den som valt filter och sätt searchParams */
  const handleProducts = (e) => {
    setFilters(e.target.value)
    setSearchParams({ city: city, filters: e.target.value })
  }

  /* När vi klickar på en typ, sätt den som valt filter och sätt searchParams */
  const handleTypes = (e) => {
    setFilters(e.target.value)
    setSearchParams({ city: city, filters: e.target.value })
  }

  return (
    <div className="flex">
      <div className="dropdown z-30">
        <label tabIndex={0} className="btn m-1">
          Types
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52"
        >
          {types.map((bar) => (
            <li key={bar}>
              <button className="btn gap-2" onClick={handleTypes} value={bar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {bar}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="dropdown z-30">
        <label tabIndex={0} className="btn m-1">
          Products
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52"
        >
          {products.map((bar) => (
            <li key={bar}>
              <button
                className="btn gap-2"
                onClick={handleProducts}
                value={bar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {bar}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FilterDropdown
