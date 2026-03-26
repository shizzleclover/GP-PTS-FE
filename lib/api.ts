const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * The app is expected to run against the live backend.
 */
export const isMockMode = (): boolean => {
    // Always live (no dummy data mode).
    return false;
};

/**
 * @deprecated Dummy/mock data mode has been removed.
 */
export const toggleMockMode = (mode: boolean) => {
    void mode;
    // No-op.
};

interface FetchOptions extends RequestInit {
    requireAuth?: boolean;
}

/**
 * Global fetch wrapper that automatically handles the mock toggle
 * and injects JWT authorization headers for the live backend.
 */
export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
    // Prepare headers (live mode only).
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    // Inject Authorization Header if required
    if (options.requireAuth !== false && typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    // Execute Native Fetch
    const url = `${API_BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        // 5. Handle Global Errors (like 401 Unauthorized)
        if (response.status === 401 && typeof window !== 'undefined') {
            // Token expired or invalid
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
            throw new Error('Unauthorized');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return {
            isMock: false,
            data
        };
    } catch (error) {
        console.error(`[API Fetch Error] ${endpoint}:`, error);
        throw error;
    }
}
