export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
export const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3000";

export async function authFetch(path, options = {}) {
  const { headers, ...rest } = options;
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

export async function getCurrentUser() {
  const { ok, data } = await authFetch("/auth/me");
  if (!ok || !data.success) return null;
  return data.user;
}
