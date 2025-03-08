import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
// Style
import { GlobalStyle } from "./styles/Global";
// Components
import Header from "./components/Header";
//Context
import { UserProvider } from "../src/context/UserContext";
import { User } from "lucide-react";
// App component
function App() {
  return (

    <BrowserRouter>
      <UserProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/*" element={<Layout />} />
        </Routes>
      </UserProvider>
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
      </Routes>
    </>
  );
}

export default App;
