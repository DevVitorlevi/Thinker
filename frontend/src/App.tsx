import { BrowserRouter, Routes, Route } from "react-router-dom"
//Pages
//auth
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
//style
import { GlobalStyle } from "./styles/Global"

function App() {

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
