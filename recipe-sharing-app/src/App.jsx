import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import { RecipeDetails } from './components/RecipeDetails';
import { EditRecipeForm } from './components/EditRecipeForm';
function App() {
  return (
    <Router>
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h1>Recipe Sharing App</h1>
        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={
              <>
                <AddRecipeForm />
                <RecipeList />
              </>
            }
          />
          {/* Details route */}
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          {/* Edit route */}
          <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
