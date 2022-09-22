import React from "react"
import SuggestionForm from "../components/SuggestionForm"
import useGetAllBars from "../hooks/useGetAllBars"
import SuggestionList from "../components/SuggestionList"
import { useMemo } from "react"
import { useAuthContext } from "../contexts/AuthContext"

function SuggestionPage() {
  //Kontextet för om man är inloggad eller ej
  const { currentUser } = useAuthContext()
  /* Hämtar alla suggestions */
  const { data: suggestions, loading } = useGetAllBars("suggestions")
  console.log(suggestions)
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
