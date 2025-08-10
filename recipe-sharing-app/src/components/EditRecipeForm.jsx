import React, { useState, useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { useNavigate, useParams } from 'react-router-dom';
export function EditRecipeForm() {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === id)
  );
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
      setIngredients((recipe.ingredients || []).join('\n'));
      setSteps((recipe.steps || []).join('\n'));
    }
  }, [recipe]);
  if (!recipe) return <div>Recipe not found.</div>;
  function handleSubmit(e) {
    e.preventDefault();
    updateRecipe(id, {
      title,
      description,
      ingredients: ingredients.split('\n').map((i) => i.trim()).filter(Boolean),
      steps: steps.split('\n').map((s) => s.trim()).filter(Boolean),
    });
    navigate(`/recipes/${id}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (one per line)"
      />
      <textarea
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        placeholder="Steps (one per line)"
      />
      <button type="submit">Save</button>
    </form>
  );
}
