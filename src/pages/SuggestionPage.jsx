import React from "react"
import SuggestionForm from "../components/SuggestionForm"
import useGetCollection from "../hooks/useGetCollection"
import SuggestionList from "../components/SuggestionList"
import BarTable from "../components/BarTable"
import { useMemo } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { Tab } from "@headlessui/react"
import { useState } from "react"

function SuggestionPage() {
  return (
    <>
      <SuggestionForm></SuggestionForm>
    </>
  )
}

export default SuggestionPage
