import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import Signup from "./components/pages/Signup";
import Dashboard from "./components/pages/Dashboard";
import AuthController from "./components/pages/AuthController";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path= "/auth" element={<AuthController />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}