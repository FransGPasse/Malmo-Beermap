import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import { useForm } from "react-hook-form"
import React from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function EditForm(bar) {
  const { id } = useParams()
  const { category } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const editTheBar = async (data) => {
    //Reference to the current bar
    const ref = doc(db, category, id)

    //Check if the input is empty or not, if it is save the old value
    //This will ensure data will not be overwritten på empty fields
    function giveRightInput(input, oldValue) {
      if (input === "") {
        return oldValue
      } else {
        return input
      }
    }

    await updateDoc(ref, {
      name: giveRightInput(data.name, bar.bar.name),
      street: giveRightInput(data.street, bar.bar.street),
      cuisine: giveRightInput(data.cuisine, bar.bar.cuisine),
      city: giveRightInput(data.city, bar.bar.city),
      description: giveRightInput(data.description, bar.bar.description),
      type: giveRightInput(data.type, bar.bar.type),
      phone: giveRightInput(data.phone, bar.bar.phone),
      website: giveRightInput(data.website, bar.bar.website),
      email: giveRightInput(data.email, bar.bar.email),
      fb: giveRightInput(data.fb, bar.bar.fb),
      insta: giveRightInput(data.insta, bar.bar.insta),
    })

    reset()

    console.log("The bar is updated! 🍻")
    navigate("/suggestions")
  }
  return (
    <div className="flex content-center m-auto w-screen h-screen items-center justify-center z-10">
      <div className="mt-10 sm:mt-0">
        <div>
          <div className="md:col-span-1 my-5">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Edit the suggested bar
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Want to change something? Awesome!
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmit(editTheBar)}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-gray-300 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        {...register("name")}
                        placeholder={bar.bar.name}
                        type="text"
                        name="name"
                        defaultValue={bar.bar.name}
                        id="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street
                      </label>
                      <input
                        {...register("street")}
                        placeholder={bar.bar.street}
                        defaultValue={bar.bar.street}
                        type="text"
                        name="street"
                        id="street"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="cuisine"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cuisine
                      </label>
                      <input
                        {...register("cuisine")}
                        type="text"
                        name="cuisine"
                        placeholder={bar.bar.cuisine}
                        defaultValue={bar.bar.cuisine}
                        id="cuisine"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="cuisine"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        {...register("city")}
                        type="text"
                        name="city"
                        placeholder={bar.bar.city}
                        defaultValue={bar.bar.city}
                        id="city"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        {...register("description")}
                        id="description"
                        placeholder={bar.bar.description}
                        defaultValue={bar.bar.description}
                        className="w-full border border-solid border-gray-300 font-normal"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-5">
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Type
                      </label>
                      <select
                        {...register("type")}
                        placeholder={bar.bar.type}
                        defaultValue={bar.bar.type}
                        id="type"
                        name="type"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
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
                        placeholder={bar.bar.phone}
                        defaultValue={bar.bar.phone}
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
                        placeholder={bar.bar.email}
                        defaultValue={bar.bar.email}
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
                        placeholder={bar.bar.website}
                        defaultValue={bar.bar.website}
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
                        placeholder={bar.bar.fb}
                        defaultValue={bar.bar.fb}
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
                        placeholder={bar.bar.insta}
                        defaultValue={bar.bar.insta}
                        id="insta"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Change
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditForm
