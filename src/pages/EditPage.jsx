import React from "react"
import EditForm from "../components/EditForm"
import { useParams } from "react-router-dom"
import useGetDocument from "../hooks/useGetDocument"

function EditPage() {
  //Hitta id för vald bar
  const { id } = useParams()
  const { category } = useParams()
  //Get the data for the chosen bar and send it as a prop to the edit form
  const { data: bar, loading } = useGetDocument(category, id)

  return <EditForm bar={bar}></EditForm>
}

export default EditPage
