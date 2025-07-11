import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Nav from "./components/Nav"
import { CreateTickets } from "./pages/CreateTickets"
import PrivateRoute from "./components/PrivateRoute"
import TicketList from "./pages/TicketList"
import Ticket from "./pages/Ticket"

function App() {
  return (
    <>
      <BrowserRouter>
      <Nav/>
      <div className="min-h-screen pt-16">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/new-ticket" element={<PrivateRoute/>}>
        <Route index element={<CreateTickets/>}/>
        </Route>
        <Route path="/tickets" element={<PrivateRoute/>}>
        <Route index element={<TicketList/>}/>
        </Route>
        <Route path="/tickets/:ticketId" element={<PrivateRoute/>}>
        <Route index element={<Ticket/>}/>
        </Route>
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