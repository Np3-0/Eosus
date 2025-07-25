import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import Signup from "./components/pages/Signup";
import Dashboard from "./components/pages/Dashboard";
import AuthController from "./components/pages/AuthController";
import NotFound from "./components/pages/NotFound";
import CompleteProfile from "./components/pages/CompleteProfile";
import PrivacyInfo from "./components/pages/PrivacyInfo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path= "/auth" element={<AuthController />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* Misc paths */}
        <Route path="/privacy-info" element={<PrivacyInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}