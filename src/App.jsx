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
import AdminPage from "./pages/AdminPage"
import RequireAuth from "./components/RequireAuth"
import "./assets/fonts.css"

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/suggestions" element={<SuggestionPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminSignUpForm />} />
        <Route path="/edit/:category/:id" element={<EditPage />} />
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
