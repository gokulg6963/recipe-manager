import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "/api";

function RecipeList({ token }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get(`${API_BASE}/recipes/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setRecipes(res.data);
    };
    fetchRecipes();
  }, [token]);

  return (
    <div>
      <h2>My Recipes</h2>
      {recipes.length === 0 ? <p>No recipes found.</p> : null}
      <ul>
        {recipes.map((r) => (
          <li key={r.id} style={{ marginBottom: "1rem" }}>
            <strong>{r.title}</strong> ({r.category}) {r.tried && "✔️"}<br />
            {r.image && <img src={`http://localhost:8000${r.image}`} alt="recipe" width={100} />}<br />
            <small>{r.ingredients}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;