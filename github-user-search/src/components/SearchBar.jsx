import React, { useState } from 'react';
import githubApi from '../services/githubApi';
function SearchBar() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const handleSearch = async () => {
    setError('');
    setUserData(null);
    if (!username) {
      setError('Please enter a username');
      return;
    }
    try {
      const response = await githubApi.get(`/users/${username}`);
      setUserData(response.data);
    } catch (err) {
      setError('User not found');
    }
  };
  return (
    <div>
      <input
        type="text"
        value={username}
        placeholder="Enter GitHub username"
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button onClick={handleSearch} style={{ padding: '8px' }}>
        Search
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData && (
        <div style={{ marginTop: '20px' }}>
          <img
            src={userData.avatar_url}
            alt={userData.login}
            width="100"
            style={{ borderRadius: '50%' }}
          />
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}
export default SearchBar;
