import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Home from "./pages/home/Home"
import Watch from "./pages/watch/Watch"
import Search from "./pages/search/Search"
import Profile from "./pages/profile/Profile"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/watch/:id" element={<Watch/>} />
        <Route path="/search/:nameSearch" element={<Search/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
