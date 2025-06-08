const API_BASE_URL = 'http://localhost:5000/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

async function apiClient<T>(
  endpoint: string,
  method: string = 'GET',
  data: any = null,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include', // Important for cookies
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  // Add auth token if exists
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        error: responseData.error || 'An error occurred',
        status: response.status,
      };
    }

    return {
      data: responseData as T,
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
      status: 500,
    };
  }
}

export default apiClient;
