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
    <div style={{ marginTop: "1rem" }}>
      <h2>Add Recipe</h2>
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /><br />
      <textarea placeholder="Ingredients" value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} /><br />
      <textarea placeholder="Steps" value={form.steps} onChange={e => setForm({ ...form, steps: e.target.value })} /><br />
      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
        <option value="veg">Vegetarian</option>
        <option value="nonveg">Non-Vegetarian</option>
        <option value="dessert">Dessert</option>
      </select><br />
      <label>
        Tried?
        <input type="checkbox" checked={form.tried} onChange={e => setForm({ ...form, tried: e.target.checked })} />
      </label><br />
      <input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} /><br />
      <button onClick={handleCreate}>Submit</button>
    </div>
  );
}

export default RecipeForm;

