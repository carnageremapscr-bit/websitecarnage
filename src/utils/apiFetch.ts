// Centralized fetch utility for API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5500";

export async function apiFetch(path: string, options?: RequestInit) {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path.startsWith("/") ? path : "/" + path}`;
  return fetch(url, options);
}
