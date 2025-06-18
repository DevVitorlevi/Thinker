import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalStyle } from "./styles/Global"
import { Landing } from "./pages/Landing"
import { Register } from './pages/Auth/Register'
import { Login } from "./pages/Auth/Login"
import { Home } from "./pages/Home/Home"
import { UserProvider } from "./Context/UserContext"
import { PrivateRoute } from "./routes/PrivateRoutes" // novo import

function App() {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/home'
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
