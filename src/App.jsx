import { Routes, Route } from "react-router-dom"
import "./assets/index.css"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import NavBar from "./components/NavBar"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
