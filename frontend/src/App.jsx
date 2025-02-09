import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Login from './pages/Login'
import Register from './pages/Register'
//components
//STYLES
import GlobalStyles from './styles/Global'

function App() {

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
