import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
// Style
import { GlobalStyle } from "./styles/Global";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./Context/AuthContext";
// Components
import Header from "./components/Header";

// App component
function App() {
  const { auth } = useAuth(); // Suponho que useAuth retorne o objeto auth corretamente tipado
  const [usuario, setUsuario] = useState<User | null>(null); // Tipando como User ou null

  useEffect(() => {
    const cancelarObservador = onAuthStateChanged(auth, (usuario) => {
      setUsuario(usuario); // Define o usuário autenticado ou null se não autenticado
    });

    return () => cancelarObservador(); // Remove o observador ao desmontar o componente
  }, [auth]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
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
