import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import axios from "axios";

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
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Recipe Manager</h1>
      {!token ? (
        isLogin ? (
          <>
            <LoginForm setToken={setToken} />
            <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Signup</button></p>
          </>
        ) : (
          <>
            <SignupForm setToken={setToken} />
            <p>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></p>
          </>
        )
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <RecipeForm token={token} />
          <RecipeList token={token} />
        </>
      )}
    </div>
  );
}

export default App;