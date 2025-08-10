import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';
import { DeleteRecipeButton } from './DeleteRecipeButton';
export function RecipeDetails() {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === id)
  );
  if (!recipe) return <div>Recipe not found.</div>;
  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients?.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h3>Steps</h3>
      <ol>
        {recipe.steps?.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <div style={{ marginTop: '1rem' }}>
        <Link to={`/recipes/${id}/edit`}>Edit</Link>
        <DeleteRecipeButton id={id} />
      </div>
    </div>
  );
}
