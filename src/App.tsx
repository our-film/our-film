import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./page/Login/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
