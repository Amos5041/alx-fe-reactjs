import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';
export default function RecommendationsList() {
  const { recommendations, generateRecommendations } = useRecipeStore((state) => ({
    recommendations: state.recommendations,
    generateRecommendations: state.generateRecommendations,
  }));
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) {
    return <p>No recommendations yet. Add some favorites first!</p>;
  }
  return (
    <div>
      <h2>Recommended for You</h2>
      {recommendations.map((r) => (
        <div key={r.id} style={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
          <h3>{r.title}</h3>
          <p>{r.description}</p>
          <Link to={`/recipes/${r.id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}
