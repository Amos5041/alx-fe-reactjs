import React from 'react';
import { useRecipeStore } from '../recipeStore';
export default function FavoriteButton({ recipeId }) {
  const { favorites, addFavorite, removeFavorite } = useRecipeStore((state) => ({
    favorites: state.favorites,
    addFavorite: state.addFavorite,
    removeFavorite: state.removeFavorite,
  }));
  const isFavorite = favorites.includes(recipeId);
  return (
    <button
      onClick={() =>
        isFavorite ? removeFavorite(recipeId) : addFavorite(recipeId)
      }
      style={{
        background: isFavorite ? 'gold' : '#eee',
        border: '1px solid #ccc',
        padding: '5px 10px',
        marginLeft: '10px',
        cursor: 'pointer',
      }}
    >
      {isFavorite ? '★ Favorite' : '☆ Add to Favorites'}
    </button>
  );
}
