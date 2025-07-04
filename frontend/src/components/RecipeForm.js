import React, { useState } from "react";
import axios from "axios";

const API_BASE = "/api";

function RecipeForm({ token }) {
  const [form, setForm] = useState({ title: "", ingredients: "", steps: "", category: "veg", tried: false, image: null });

  const handleCreate = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    await axios.post(`${API_BASE}/recipes/create/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    setForm({ title: "", ingredients: "", steps: "", category: "veg", tried: false, image: null });
  };

  return (
    <div className="card p-4 mb-4">
      <h2>Add Recipe</h2>
      <input className="form-control mb-2" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea className="form-control mb-2" placeholder="Ingredients" value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} />
      <textarea className="form-control mb-2" placeholder="Steps" value={form.steps} onChange={e => setForm({ ...form, steps: e.target.value })} />
      <select className="form-select mb-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
        <option value="veg">Vegetarian</option>
        <option value="nonveg">Non-Vegetarian</option>
        <option value="dessert">Dessert</option>
      </select>
      <div className="form-check form-switch mb-2">
        <input className="form-check-input" type="checkbox" role="switch" checked={form.tried} onChange={e => setForm({ ...form, tried: e.target.checked })} />
        <label className="form-check-label">Tried?</label>
      </div>
      <input className="form-control mb-3" type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
      <button className="btn btn-primary" onClick={handleCreate}>Submit</button>
    </div>
  );
}

export default RecipeForm;