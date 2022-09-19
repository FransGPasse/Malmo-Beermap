import { Routes, Route } from "react-router-dom"
import "./assets/index.css"
import SuggestionPage from "./pages/SuggestionPage"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import AdminLogin from "./pages/AdminLogin"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/suggestions" element={<SuggestionPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        {/* Protected routes below */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
