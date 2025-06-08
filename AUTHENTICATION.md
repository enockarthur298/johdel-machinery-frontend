# Authentication Flow

This document outlines the authentication flow and integration with the backend API.

## Setup

1. **Environment Variables**
   Create a `.env` file in the project root with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Authentication Flow

### 1. Login
- User submits login form with email and password
- Frontend sends POST request to `/auth/login`
- On success, tokens are stored in localStorage and user is redirected to the home page

### 2. Registration
- User submits registration form with required details
- Frontend sends POST request to `/auth/register`
- On success, user is automatically logged in and redirected

### 3. Token Refresh
- Access tokens expire after a set time
- The axios interceptor automatically refreshes the token when a 401 is received
- The refresh token is used to get a new access token

### 4. Protected Routes
- Protected routes check for authentication
- Unauthenticated users are redirected to login with a return URL

## Key Files

- `src/providers/AuthProvider.js` - Manages auth state and provides auth context
- `src/api/axiosInstance.js` - Configures axios with interceptors for auth
- `src/components/ProtectedRoute.js` - Protects routes that require auth
- `src/utils/tokenService.js` - Handles token storage and retrieval
- `src/utils/apiErrorHandler.js` - Standardizes API error handling

## API Integration

All API calls should be made through the axios instance to ensure:
- Authentication headers are included
- Tokens are refreshed when needed
- Errors are handled consistently

## Logout

Logging out:
1. Clears tokens from storage
2. Updates auth state
3. Redirects to login page
