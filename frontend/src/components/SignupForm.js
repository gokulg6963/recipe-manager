import React, { useState } from "react";
import axios from "axios";

const API_BASE = "/api";

function SignupForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${API_BASE}/signup/`, { username, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setError("Signup failed. Username may already exist.");
    }
  };

  return (
    <div className="card p-4 mb-3">
      <h2>Signup</h2>
      <input className="form-control mb-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-success" onClick={handleSignup}>Signup</button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}

export default SignupForm;