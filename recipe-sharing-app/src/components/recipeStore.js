import create from 'zustand';
export const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  // Recipe actions
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, { ...recipe, id: generateId() }],
    })),
  updateRecipe: (id, updates) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
      favorites: state.favorites.filter((favId) => favId !== id), // remove from favorites too
    })),
  // Favorites actions
  addFavorite: (recipeId) =>
    set((state) =>
      state.favorites.includes(recipeId)
        ? state
        : { favorites: [...state.favorites, recipeId] }
    ),
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),
  // Recommendations generator (simple ingredient overlap)
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));
    const recommended = recipes.filter(
      (r) =>
        !favorites.includes(r.id) &&
        favoriteRecipes.some((fav) =>
          r.ingredients?.some((ing) => fav.ingredients?.includes(ing))
        )
    );
    set({ recommendations: recommended });
  },
}));
// Helper to generate unique IDs
function generateId() {
  return String(Date.now()) + Math.random().toString(36).slice(2, 8);
}
