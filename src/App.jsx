import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import MainPage from "./components/MainPage/MainPage";
import SignUp from "./components/SignUp/SignUp";
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

