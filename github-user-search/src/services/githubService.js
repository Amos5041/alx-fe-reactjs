import axios from 'axios';
const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
export async function searchUsers({ username, location, minRepos, page = 1 }) {
  let query = '';
  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;
  try {
    const response = await axios.get(
      `https://api.github.com/search/users`,
      {
        params: {
          q: query.trim(),
          page,
          per_page: 5
        },
        headers: apiKey ? { Authorization: `token ${apiKey}` } : {}
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
