// recipeStore.js
import create from 'zustand';
export const useRecipeStore = create((set, get) => ({
  recipes: [],
  // existing actions
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
  // new search-related state/actions
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  // derived recipes filtered by search term
  filteredRecipes: () => {
    const { recipes, searchTerm } = get();
    if (!searchTerm.trim()) return recipes;
    return recipes.filter((r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
}));
function generateId() {
  return String(Date.now()) + Math.random().toString(36).slice(2, 8);
}
