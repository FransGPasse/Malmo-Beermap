import { Routes, Route } from "react-router-dom"
import "./assets/index.css"
import SuggestionPage from "./pages/SuggestionPage"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import AdminLogin from "./pages/AdminLogin"
import AdminSignUpForm from "./components/AdminSignUpForm"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import EditPage from "./pages/EditPage"
import BarListPage from "./pages/BarListPage"
import AdminPage from "./pages/AdminPage"
import RequireAuth from "./components/RequireAuth"
import GoogleBeerMap from "./components/GoogleBeerMap"

function App() {
  return (
    <div className="bg-gradient-to-b from-green-300 to-green-700">
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/googlebeermap" element={<GoogleBeerMap />} />
        <Route path="/suggestions" element={<SuggestionPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminSignUpForm />} />
        <Route path="/edit/:category/:id" element={<EditPage />} />
        <Route path="/barlist" element={<BarListPage />} />
        {/* Protected routes below */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
