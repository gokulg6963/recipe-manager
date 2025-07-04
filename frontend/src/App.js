import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE = "/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogout = async () => {
    await axios.post(`${API_BASE}/logout/`, {}, {
      headers: { Authorization: `Token ${token}` },
    });
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Recipe Manager</h1>
      {!token ? (
        isLogin ? (
          <>
            <LoginForm setToken={setToken} />
            <p>Don't have an account? <button className="btn btn-link" onClick={() => setIsLogin(false)}>Signup</button></p>
          </>
        ) : (
          <>
            <SignupForm setToken={setToken} />
            <p>Already have an account? <button className="btn btn-link" onClick={() => setIsLogin(true)}>Login</button></p>
          </>
        )
      ) : (
        <>
          <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>
          <RecipeForm token={token} />
          <RecipeList token={token} />
        </>
      )}
    </div>
  );
}

export default App;