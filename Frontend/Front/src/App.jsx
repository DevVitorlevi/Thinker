import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalStyle } from "./styles/Global"
import { Landing } from "./pages/Landing"
function App() {


  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
