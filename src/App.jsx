import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import Home from "./pages/Home";
import { Graphics } from "./pages/Graphics";
import { Probability } from "./pages/Probability";
import { Prediction } from "./pages/Prediction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/graphics" element={<Graphics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/probability" element={<Probability />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}