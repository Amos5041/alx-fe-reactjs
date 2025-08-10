// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';
function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError('');
    setUserData(null);
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '20px' }}>
      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={username}
          placeholder="Enter GitHub username"
          onChange={(e) => setUsername(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Search
        </button>
      </form>
      {/* Conditional Rendering */}
      <div style={{ marginTop: '20px' }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {userData && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={userData.avatar_url}
              alt={userData.login}
              width="100"
              style={{ borderRadius: '50%' }}
            />
            <h2>{userData.name || userData.login}</h2>
            <a href={userData.html_url} target="_blank" rel="noreferrer">
              View Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
export default Search;
