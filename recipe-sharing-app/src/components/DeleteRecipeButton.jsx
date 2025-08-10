import React from 'react';
import { useRecipeStore } from '../recipeStore';
import { useNavigate } from 'react-router-dom';
export function DeleteRecipeButton({ id }) {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();
  function handleDelete() {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
      navigate('/');
    }
  }
  return (
    <button onClick={handleDelete} style={{ marginLeft: '1rem', color: 'red' }}>
      Delete
    </button>
  );
}
