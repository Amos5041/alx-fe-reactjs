// src/services/githubService.js
import axios from 'axios';
const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: apiKey ? { Authorization: `token ${apiKey}` } : {}
});
export async function fetchUserData(username) {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
