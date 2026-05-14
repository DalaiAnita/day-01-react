import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/users" element={<Users/>} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
