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

  const toggleTried = async (recipe) => {
  const updatedRecipe = {
    title: recipe.title,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    category: recipe.category,
    tried: !recipe.tried,
  };

  await axios.put(`${API_BASE}/recipes/${recipe.id}/update/`, updatedRecipe, {
    headers: { Authorization: `Token ${token}` },
  });

  fetchRecipes();
};

  return (
    <div className="mb-4">
      <h2>My Recipes</h2>
      {recipes.length === 0 ? <p>No recipes found.</p> : null}
      <div className="row">
        {recipes.map((r) => (
          <div key={r.id} className="col-md-6 col-lg-4">
            <div className="card p-3 mb-3 h-100">
              <h5 className="d-flex justify-content-between align-items-center">
                {r.title}
                <span className={`badge bg-${r.tried ? 'success' : 'secondary'}`}>{r.tried ? 'Tried' : 'To Try'}</span>
              </h5>
              <p><strong>Category:</strong> {r.category}</p>
              {r.image && <img src={`http://localhost:8000${r.image}`} alt="recipe" className="img-fluid mb-2" style={{ maxHeight: "150px", objectFit: "cover" }} />}
              <p><strong>Ingredients:</strong> {r.ingredients}</p>
              <p><strong>Steps:</strong> {r.steps}</p>
              <div className="form-check form-switch mb-2">
                <input className="form-check-input" type="checkbox" checked={r.tried} onChange={() => toggleTried(r)} />
                <label className="form-check-label">Mark as {r.tried ? 'To Try' : 'Tried'}</label>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(r)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <div className="card p-4">
          <h3>Edit Recipe</h3>
          <input className="form-control mb-2" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" />
          <textarea className="form-control mb-2" value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} placeholder="Ingredients" />
          <textarea className="form-control mb-2" value={form.steps} onChange={e => setForm({ ...form, steps: e.target.value })} placeholder="Steps" />
          <select className="form-select mb-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
            <option value="dessert">Dessert</option>
          </select>
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" role="switch" checked={form.tried} onChange={e => setForm({ ...form, tried: e.target.checked })} />
            <label className="form-check-label">Tried?</label>
          </div>
          <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
          <button className="btn btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default RecipeList;