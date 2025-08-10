import React from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';
export default function FavoritesList() {
  const favorites = useRecipeStore((state) =>
    state.favorites
      .map((id) => state.recipes.find((r) => r.id === id))
      .filter(Boolean)
  );
  if (favorites.length === 0) {
    return <p>No favorites yet.</p>;
  }
  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.map((r) => (
        <div key={r.id} style={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
          <h3>{r.title}</h3>
          <p>{r.description}</p>
          <Link to={`/recipes/${r.id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}
