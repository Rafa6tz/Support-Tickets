import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Nav from "./components/Nav"

function App() {
  return (
    <>
      <BrowserRouter>
      <Nav/>
      <div className="min-h-screen lg:pt-20 pt-16">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </div>
      </BrowserRouter>
      <ToastContainer
position="bottom-right"
/>
    </>
  )
}

export default App