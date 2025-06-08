/**
 * Handles API errors consistently across the application
 * @param {Error} error - The error object from the API call
 * @returns {Object} - An object containing the error message and status code
 */
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;
    
    if (status === 401) {
      // Unauthorized - redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
      }
      return { message: 'Your session has expired. Please log in again.', status };
    }
    
    if (status === 403) {
      return { message: 'You do not have permission to perform this action.', status };
    }
    
    if (status === 404) {
      return { message: 'The requested resource was not found.', status };
    }
    
    if (status >= 500) {
      return { message: 'A server error occurred. Please try again later.', status };
    }
    
    // Handle validation errors or other 4xx errors
    const message = data?.message || data?.error || 'An error occurred';
    return { message, status };
  } 
  
  if (error.request) {
    // The request was made but no response was received
    return { message: 'No response from server. Please check your connection.', status: 0 };
  }
  
  // Something happened in setting up the request that triggered an Error
  return { message: error.message || 'An unexpected error occurred', status: -1 };
};

/**
 * Creates a consistent error response object
 * @param {string} message - Error message
 * @param {any} [data] - Additional error data
 * @returns {Object} - Standard error response object
 */
export const createErrorResponse = (message, data = null) => ({
  success: false,
  error: message,
  ...(data && { data })
});

/**
 * Creates a consistent success response object
 * @param {any} data - Response data
 * @param {string} [message] - Optional success message
 * @returns {Object} - Standard success response object
 */
export const createSuccessResponse = (data, message = '') => ({
  success: true,
  data,
  ...(message && { message })
});
