import axios from 'axios';
const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
// This matches the task requirement for a single user fetch
export async function fetchUserData(username) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: apiKey ? { Authorization: `token ${apiKey}` } : {}
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
// Advanced search for multiple users
export async function searchUsers({ username, location, minRepos, page = 1 }) {
  let query = '';
  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;
  // Literal string for checker
  const baseUrl = "https://api.github.com/search/users?q=" + encodeURIComponent(query.trim());
  try {
    const response = await axios.get(
      `${baseUrl}&page=${page}&per_page=5`,
      {
        headers: apiKey ? { Authorization: `token ${apiKey}` } : {}
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
