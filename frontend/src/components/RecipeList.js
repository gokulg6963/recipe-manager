import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "/api";

function RecipeList({ token }) {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", ingredients: "", steps: "", category: "veg", tried: false });

  const fetchRecipes = async () => {
    const res = await axios.get(`${API_BASE}/recipes/`, {
      headers: { Authorization: `Token ${token}` },
    });
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, [token]);

  const handleEdit = (recipe) => {
    setEditing(recipe.id);
    setForm(recipe);
  };

  const handleUpdate = async () => {
    await axios.put(`${API_BASE}/recipes/${editing}/update/`, form, {
      headers: { Authorization: `Token ${token}` },
    });
    setEditing(null);
    setForm({ title: "", ingredients: "", steps: "", category: "veg", tried: false });
    fetchRecipes();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE}/recipes/${id}/delete/`, {
      headers: { Authorization: `Token ${token}` },
    });
    fetchRecipes();
  };

  return (
    <div>
      <h2>My Recipes</h2>
      {recipes.length === 0 ? <p>No recipes found.</p> : null}
      <ul>
        {recipes.map((r) => (
          <li key={r.id} style={{ marginBottom: "1rem" }}>
            <strong>{r.title}</strong> ({r.category}) {r.tried && "✔️"}<br />
            {r.image && <img src={`http://localhost:8000${r.image}`} alt="recipe" width={100} />}<br />
            <small>{r.ingredients}</small><br />
            <button onClick={() => handleEdit(r)}>Edit</button>
            <button onClick={() => handleDelete(r.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editing && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Edit Recipe</h3>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" /><br />
          <textarea value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} placeholder="Ingredients" /><br />
          <textarea value={form.steps} onChange={e => setForm({ ...form, steps: e.target.value })} placeholder="Steps" /><br />
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
            <option value="dessert">Dessert</option>
          </select><br />
          <label>
            Tried?
            <input type="checkbox" checked={form.tried} onChange={e => setForm({ ...form, tried: e.target.checked })} />
          </label><br />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditing(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default RecipeList;