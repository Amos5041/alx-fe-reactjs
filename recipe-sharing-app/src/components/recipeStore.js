// recipeStore.js
import create from 'zustand';
export const useRecipeStore = create((set) => ({
  recipes: [], // your existing default state
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
    })),
}));
function generateId() {
  return String(Date.now()) + Math.random().toString(36).slice(2, 8);
}
