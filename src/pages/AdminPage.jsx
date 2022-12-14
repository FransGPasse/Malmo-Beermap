import React from "react"
import CreateForm from "../components/CreateForm"
import useGetCollection from "../hooks/useGetCollection"
import useGetDocument from "../hooks/useGetDocument"
import SuggestionList from "../components/SuggestionList"

import { useMemo } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { Tab } from "@headlessui/react"
import { useState, useRef } from "react"
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore"
import { auth, db, storage } from "../firebase"
import { gsap } from "gsap"
import { useEffect } from "react"

const AdminPage = () => {
  //Kontextet för om man är inloggad eller ej
  const { currentUser } = useAuthContext()
  /* Hämtar alla suggestions */
  const { data: suggestions, loading } = useGetCollection("suggestions")

  const adminContainer = useRef()
  const buttonContainer = useRef()

  /* Hämtar alla bars */
  const { data: bars } = useGetCollection("bars")

  /* Hämtar alla användare */
  const { data: users } = useGetCollection("users")

  const handleConfirm = (data) => {
    addDoc(collection(db, "bars"), {
      name: data.name,
      street: data.street,
      cuisine: data.cuisine,
      city: data.city,
      description: data.description,
      type: data.type,
      product: data.product,
      phone: data.phone,
      website: data.website,
      email: data.email,
      fb: data.fb,
      insta: data.insta,
      lat: data.lat,
      lng: data.lng,
    })
    deleteDoc(doc(db, "suggestions", data.id))
  }

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
        disableSortBy: true,
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Product",
        accessor: "product",
      },
      {
        Header: "Phone",
        accessor: "phone",
        disableSortBy: true,
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
      {
        Header: "Confirm",
        //Länk för att redigera vald restaurang
        Cell: ({ row: { original: suggestion } }) => (
          <button
            className="btn btn-success"
            onClick={() => handleConfirm(suggestion)}
          >
            Confirm
          </button>
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
        disableSortBy: true,
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        header: "Product",
        accessor: "product",
      },
      {
        Header: "Phone",
        accessor: "phone",
        disableSortBy: true,
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
        Header: "Profile picture",
        accessor: "profilePicture",
        Cell: ({ row: { original: profilePicture } }) => (
          <div className="mask mask-squircle w-14 h-14">
            <img src={profilePicture.profilePicture} alt="photo" />
          </div>
        ),
      },
      {
        Header: "Username",
        accessor: "name",
      },
      {
        id: "admin",
        Header: "Admin",
        accessor: (v) => v.admin.toString(),
      },
    ]
  }, [])

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }

  let [categories] = useState(["Suggestions", "Bars", "Users"])

  useEffect(() => {
    gsap.fromTo(
      adminContainer.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    )
    gsap.fromTo(
      buttonContainer.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    )
  }, [])

  return (
    <>
      {currentUser && (
        <div className="bg-secondary flex flex-col justify-center items-center pl-10 pr-10">
          <Tab.Group>
            <Tab.List
              ref={buttonContainer}
              className="mt-20 flex space-x-1 rounded-xl bg-secondary w-full"
            >
              {categories.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary bg-primary",
                      "ring-opacity-60 ring-offset-2 ring-accent focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-accent hover:text-primary"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels ref={adminContainer} className="mt-2 w-3/4">
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
      <CreateForm id={"create"}></CreateForm>
    </>
  )
}

export default AdminPage
