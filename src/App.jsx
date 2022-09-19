import { Routes, Route } from "react-router-dom"
import "./assets/index.css"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import NavBar from "./components/NavBar"
import SuggestionPage from "./pages/SuggestionPage"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/suggestions" element={<SuggestionPage />} />
      </Routes>
    </div>
  )
}

export default App
