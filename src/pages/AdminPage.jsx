import React from "react"
import SuggestionForm from "../components/SuggestionForm"
import useGetCollection from "../hooks/useGetCollection"
import SuggestionList from "../components/SuggestionList"

import { useMemo } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { Tab } from "@headlessui/react"
import { useState } from "react"

const AdminPage = () => {
  //Kontextet för om man är inloggad eller ej
  const { currentUser } = useAuthContext()
  /* Hämtar alla suggestions */
  const { data: suggestions, loading } = useGetCollection("suggestions")

  /* Hämtar alla bars */
  const { data: bars } = useGetCollection("bars")

  /* Hämtar alla användare */
  const { data: users } = useGetCollection("users")
  console.log("users", users)

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

  //Kolumnerna för react table
  const userColumns = useMemo(() => {
    return [
      {
        Header: "Username",
        accessor: "name",
      },
      {
        Header: "Profile picture",
        accessor: "profilePicture",
      },
      {
        Header: "Admin",
        accessor: "admin",
      },
    ]
  }, [])

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }

  let [categories] = useState(["Suggestions", "Bars", "Users"])

  return (
    <>
      {currentUser && (
        <div className="flex flex-col justify-center items-center">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 w-1/3">
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
            <Tab.Panels className="mt-2 w-3/4">
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
                <SuggestionList
                  columns={barColumns}
                  data={bars}
                ></SuggestionList>
              </Tab.Panel>
              <Tab.Panel
                key={3}
                className="rounded-xring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              >
                <SuggestionList
                  columns={userColumns}
                  data={users}
                ></SuggestionList>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
      <SuggestionForm></SuggestionForm>
    </>
  )
}

export default AdminPage
