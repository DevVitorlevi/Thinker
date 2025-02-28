import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
// Style
import { GlobalStyle } from "./styles/Global";
// Components
import Header from "./components/Header";

// App component
function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

// Layout component (responsável pela renderização do Header de acordo com a rota)
function Layout() {
  const location = useLocation();
  const showHeader = location.pathname !== '/register' && location.pathname !== '/login';

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
