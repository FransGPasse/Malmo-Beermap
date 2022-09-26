import React from "react"
import EditForm from "../components/EditForm"
import { useParams, Link } from "react-router-dom"
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useState } from "react"
import useGetOneBar from "../hooks/useGetOneBar"

function EditPage() {
  //Hitta id för vald bar
  const { id } = useParams()
  const { category } = useParams()
  //Get the data for the chosen bar and send it as a prop to the edit form
  const { data: bar, loading } = useGetOneBar(category, id)

  return <EditForm bar={bar}></EditForm>
}

export default EditPage
