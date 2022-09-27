import React from "react"

const BarCard = (data) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <div className="card-body">
        {/* Varför blir det dublett här? */}
        <h2 className="card-title">{data.data.name}</h2>
        <p className="italic">{data.data.street}</p>
        <p>{data.data.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default BarCard
