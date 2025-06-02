import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginScreen from "./components/LoginScreen";

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
