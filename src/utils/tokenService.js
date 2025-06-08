const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Get the authentication token from localStorage
 * @returns {string | null} The authentication token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Get the refresh token from localStorage
 * @returns {string | null} The refresh token or null if not found
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Set the authentication and refresh tokens in localStorage
 * @param {string} token - The authentication token
 * @param {string} refreshToken - The refresh token
 */
export const setTokens = (token, refreshToken) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

/**
 * Remove authentication and refresh tokens from localStorage
 */
export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Check if the user is authenticated
 * @returns {boolean} True if the user has a valid token, false otherwise
 */
export const isAuthenticated = () => {
  const token = getToken();
  // Here you might want to add token expiration check
  return !!token;
};

/**
 * Get the authorization header with the token
 * @returns {{Authorization: string} | {}} The authorization header or an empty object if no token
 */
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
