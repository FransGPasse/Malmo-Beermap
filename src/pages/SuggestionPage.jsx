import React from "react"
import SuggestionForm from "../components/SuggestionForm"
import useGetAllBars from "../hooks/useGetAllBars"
import SuggestionList from "../components/SuggestionList"
import BarList from "../components/BarList"
import { useMemo } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { Tab } from "@headlessui/react"
import { useState } from "react"

function SuggestionPage() {
  //Kontextet för om man är inloggad eller ej
  const { currentUser } = useAuthContext()
  /* Hämtar alla suggestions */
  const { data: suggestions, loading } = useGetAllBars("suggestions")

  /* Hämtar alla bars */
  const { data: bars } = useGetAllBars("bars")

  //Kolumnerna för react table
  const columns = useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Street",
        accessor: "street",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Cuisine",
        accessor: "cuisine",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Website",
        accessor: "website",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Instagram",
        accessor: "insta",
      },
      {
        Header: "Facebook",
        accessor: "fb",
      },

      {
        Header: "Edit",
        //Länk för att redigera vald restaurang
        Cell: ({ row: { original: suggestion } }) => (
          <Link to={`/edit/suggestions/${suggestion.id}`}>Edit</Link>
        ),
      },
    ]
  }, [])

  //Kolumnerna för react table
  const barColumns = useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Street",
        accessor: "street",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Cuisine",
        accessor: "cuisine",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Website",
        accessor: "website",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Instagram",
        accessor: "insta",
      },
      {
        Header: "Facebook",
        accessor: "fb",
      },

      {
        Header: "Edit",
        //Länk för att redigera vald restaurang
        Cell: ({ row: { original: bars } }) => (
          <Link to={`/edit/bars/${bars.id}`}>Edit</Link>
        ),
      },
    ]
  }, [])

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }

  let [categories] = useState(["Suggestions", "Bars"])

  return (
    <>
      {currentUser && (
        <div>
          <div className="w-full max-w-md px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {categories.map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  key={1}
                  className="rounded-xring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                >
                  <SuggestionList
                    columns={columns}
                    data={suggestions}
                  ></SuggestionList>
                </Tab.Panel>
                <Tab.Panel
                  key={2}
                  className="rounded-xring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                >
                  <BarList columns={barColumns} data={bars}></BarList>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      )}
      <SuggestionForm></SuggestionForm>
    </>
  )
}

export default SuggestionPage
