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
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default SignupForm;
