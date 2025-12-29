import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user_id");
    if (stored) setUserId(stored);
  }, []);

  const handleLogin = (id) => {
    setUserId(id);
    localStorage.setItem("user_id", id);
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem("user_id");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userId ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/signup"
          element={userId ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/login"
          element={
            userId ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            userId ? (
              <Dashboard user_id={userId} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
