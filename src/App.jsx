import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import Home from "./pages/Home";
import { Graphics } from "./pages/Graphics";
import { Statistics } from "./pages/statistics";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/graphics" element={<Graphics />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
} 