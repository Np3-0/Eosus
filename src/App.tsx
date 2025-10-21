import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.tsx";
import Signup from "./components/pages/Signup.tsx";
import Dashboard from "./components/pages/Dashboard.tsx";
import AuthController from "./components/pages/AuthController.tsx";
import NotFound from "./components/pages/NotFound.tsx";
import CompleteProfile from "./components/pages/CompleteProfile.tsx";
import PrivacyInfo from "./components/pages/PrivacyInfo.tsx";
import Create from "./components/pages/Create.tsx";
import Map from "./components/pages/Map.tsx";
import AILanding from "./components/pages/AILanding.tsx";
import AIChat from "./components/pages/AIChat.tsx";
import Profile from "./components/pages/Profile.tsx";
import AdminView from "./components/pages/AdminView.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path= "/auth" element={<AuthController />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/map" element={<Map />} />
        <Route path="/ai" element={<AILanding />} />
        <Route path="/ai/:chatId" element={<AIChat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminView />} />
        {/* Misc paths */}
        <Route path="/privacy-info" element={<PrivacyInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}