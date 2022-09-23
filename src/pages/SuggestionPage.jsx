import React from "react"
import SuggestionForm from "../components/SuggestionForm"
import useGetAllBars from "../hooks/useGetAllBars"
import SuggestionList from "../components/SuggestionList"
import { useMemo } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

function SuggestionPage() {
  //Kontextet för om man är inloggad eller ej
  const { currentUser } = useAuthContext()
  /* Hämtar alla suggestions */
  const { data: suggestions, loading } = useGetAllBars("suggestions")

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
          <Link to={`/edit/${suggestion.id}`}>Edit</Link>
        ),
      },
    ]
  }, [])

  return (
    <>
      {currentUser && (
        <SuggestionList columns={columns} data={suggestions}></SuggestionList>
      )}
      <SuggestionForm></SuggestionForm>
    </>
  )
}

export default SuggestionPage
