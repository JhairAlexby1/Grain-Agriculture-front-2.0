import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import Home from "./pages/Home";
import { Graphics } from "./pages/Graphics";
import { Statistics } from "./pages/statistics";
import withAuth from "./components/withAuth";

const ProtectedHome = withAuth(Home);
const ProtectedStatistics = withAuth(Statistics);
const ProtectedGraphics = withAuth(Graphics);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/home" element={<ProtectedHome />} />
        <Route path="/statistics" element={<ProtectedStatistics />} />
        <Route path="/graphics" element={<ProtectedGraphics />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}