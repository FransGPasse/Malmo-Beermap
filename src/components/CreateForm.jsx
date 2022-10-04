import React from "react"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "../firebase"
import { useForm } from "react-hook-form"
import BeerMapAPI from "../services/BeerMapAPI"
import { useAuthContext } from "../contexts/AuthContext"

const CreateForm = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  //Kontextet för om man är inloggad eller ej
  const { currentUser } = useAuthContext()

  //Funktionen som körs om en användare inte är inloggad, då skickas resultaten från formulären till fältet "suggestions"
  const onCreateSuggestion = async (data) => {
    const coordinates = await BeerMapAPI.getCoordinates(data.street, data.city)

    await addDoc(collection(db, "suggestions"), {
      name: data.name,
      street: data.street,
      cuisine: data.cuisine,
      city: data.city,
      description: data.description,
      type: data.type,
      phone: data.phone,
      website: data.website,
      email: data.email,
      fb: data.fb,
      insta: data.insta,
      lat: coordinates.location.lat,
      lng: coordinates.location.lng,
    })

    reset()
  }

  //Funktionen som körs om en användare är inloggad, då skickas resultaten från formulären till fältet "bars"
  const onCreateBars = async (data) => {
    const coordinates = await BeerMapAPI.getCoordinates(data.street, data.city)

    await addDoc(collection(db, "bars"), {
      name: data.name,
      street: data.street,
      cuisine: data.cuisine,
      city: data.city,
      description: data.description,
      type: data.type,
      phone: data.phone,
      website: data.website,
      email: data.email,
      fb: data.fb,
      insta: data.insta,
      lat: coordinates.location.lat,
      lng: coordinates.location.lng,
    })

    reset()
  }

  return (
    <div className="absolute top-0 flex content-center m-auto w-screen h-screen items-center justify-center -z-10">
      <div className="mt-10 sm:mt-0">
        <div>
          <div className="md:col-span-1 my-5">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Bar information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Insert the information of the bar in the form below - cheers!
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form
              action="#"
              method="POST"
              onSubmit={
                id === "suggestion"
                  ? handleSubmit(onCreateSuggestion)
                  : handleSubmit(onCreateBars)
              }
            >
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-gray-300 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 pb-1"
                      >
                        Name
                      </label>
                      <input
                        {...register("name")}
                        required
                        type="text"
                        name="name"
                        id="name"
                        className="input w-full max-w-xs"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium text-gray-700 pb-1"
                      >
                        Street
                      </label>
                      <input
                        {...register("street")}
                        required
                        type="text"
                        name="street"
                        id="street"
                        className="input w-full max-w-xs"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="cuisine"
                        className="block text-sm font-medium text-gray-700 pb-1"
                      >
                        Cuisine
                      </label>
                      <input
                        {...register("cuisine")}
                        required
                        type="text"
                        name="cuisine"
                        id="cuisine"
                        className="input w-full max-w-xs"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="cuisine"
                        className="block text-sm font-medium text-gray-700 pb-1"
                      >
                        City
                      </label>
                      <input
                        {...register("city")}
                        required
                        type="text"
                        name="city"
                        id="city"
                        className="input w-full max-w-xs"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 pb-1"
                      >
                        Description
                      </label>
                      <textarea
                        {...register("description")}
                        required
                        id="description"
                        className="textarea w-max"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-5">
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-700 pb-1"
                      >
                        Type
                      </label>
                      <select
                        {...register("type")}
                        required
                        id="type"
                        name="type"
                        className="select w-full max-w-xs"
                      >
                        <option disabled selected>
                          Vad för typ av stämning?
                        </option>
                        <option>Chill</option>
                        <option>Party</option>
                        <option>AW</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        {...register("phone")}
                        type="text"
                        name="phone"
                        id="phone"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Website
                      </label>
                      <input
                        {...register("website")}
                        type="url"
                        name="website"
                        id="website"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="fb"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Facebook
                      </label>
                      <input
                        {...register("fb")}
                        type="text"
                        name="fb"
                        id="fb"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="insta"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Instagram
                      </label>
                      <input
                        {...register("insta")}
                        type="text"
                        name="insta"
                        id="insta"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  {id === "suggestion" ? (
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Suggest!
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Create a restaurant
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateForm
