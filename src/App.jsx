import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Páginas
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Cartoes from "./pages/Cartoes";
import Transacoes from "./pages/Transacoes";
import Configuracoes from "./pages/Configuracoes";

// Rota protegida
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/clientes"
            element={
              <PrivateRoute>
                <Clientes />
              </PrivateRoute>
            }
          />

          <Route
            path="/cartoes"
            element={
              <PrivateRoute>
                <Cartoes />
              </PrivateRoute>
            }
          />

          <Route
            path="/transacoes"
            element={
              <PrivateRoute>
                <Transacoes />
              </PrivateRoute>
            }
          />

          <Route
            path="/configuracoes"
            element={
              <PrivateRoute>
                <Configuracoes />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
