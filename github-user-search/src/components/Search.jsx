import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';
function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const handleSearch = async (e, resetPage = true) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (resetPage) {
      setPage(1);
      setResults([]);
    }
    try {
      const data = await searchUsers({
        username,
        location,
        minRepos,
        page: resetPage ? 1 : page
      });
      if (resetPage) {
        setResults(data.items);
      } else {
        setResults((prev) => [...prev, ...data.items]);
      }
      setHasMore(data.items.length > 0 && data.total_count > results.length);
    } catch (err) {
      setError('Error fetching results');
    } finally {
      setLoading(false);
    }
  };
  const loadMore = (e) => {
    const nextPage = page + 1;
    setPage(nextPage);
    handleSearch(e, false);
  };
  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Search Form */}
      <form
        onSubmit={(e) => handleSearch(e)}
        className="bg-white shadow-md rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={location}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          value={minRepos}
          placeholder="Min Repos"
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      {/* Results */}
      <div className="mt-6">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-4">
          {results.map((user) => (
            <li
              key={user.id}
              className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold">{user.login}</h2>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </li>
          ))}
        </ul>

        {hasMore && !loading && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Search;
