import React, { useState } from "react";
import axios from "axios";

const API_BASE = "/api";

function LoginForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE}/login/`, { username, password });
      setToken(res.data.Token);
      localStorage.setItem("token", res.data.Token);
    } catch (err) {
      setError("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="card p-4 mb-3">
      <h2>Login</h2>
      <input className="form-control mb-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}

export default LoginForm;