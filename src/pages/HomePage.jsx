import BeerMap from "../components/BeerMap"

const HomePage = () => {
  return (
    <div className="h-screen w-screen flex flex-col m-auto items-center justify-center space-y-4">
      <h1 className="text-4xl">Malmö BeerMap 🍺</h1>
      <BeerMap />
    </div>
  )
}

export default HomePage
