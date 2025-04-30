import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalStyle } from "./styles/Global"
import { Landing } from "./pages/Landing"
import Register from './pages/Register'
function App() {


  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
