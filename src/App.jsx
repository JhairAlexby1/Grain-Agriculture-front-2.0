import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import Home from "./pages/Home";
import { Graphics } from "./pages/Graphics";
import { Probability } from "./pages/Probability";
import withAuth from "./components/withAuth";
import { Prediction } from "./pages/Prediction";

const ProtectedHome = withAuth(Home);
const ProtectedProbability = withAuth(Probability);
const ProtectedGraphics = withAuth(Graphics);
const ProtectedPrediction = withAuth(Prediction);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/home" element={<ProtectedHome />} />
        <Route path="/probability" element={<ProtectedProbability />} />
        <Route path="/graphics" element={<ProtectedGraphics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prediction" element={<ProtectedPrediction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}