import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';
export default function RecipeList() {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes());
  if (filteredRecipes.length === 0) {
    return <p>No recipes found.</p>;
  }
  return (
    <div>
      {filteredRecipes.map((r) => (
        <div key={r.id} style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px' }}>
          <h3>{r.title}</h3>
          <p>{r.description}</p>
          <Link to={`/recipes/${r.id}`}>View</Link> |{' '}
          <Link to={`/recipes/${r.id}/edit`}>Edit</Link>
        </div>
      ))}
    </div>
  );
}
