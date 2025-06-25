// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./modules/auth/Login"
import Menu from "./modules/menu/Menu"
import { Toaster } from "sonner"
import { ShoppingCard } from "./modules/shoppingCard/ShoppingCard"
import { OrderSuccessPage } from "./modules/confirmation/Confirmation"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/shopping" element={<ShoppingCard />} />
          <Route path="/orden-exitosa" element={<OrderSuccessPage />} />
        </Routes>
      </Router>
      <Toaster richColors position="bottom-right" />
    </>
  )
}

export default App
