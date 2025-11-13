// src/lib/clientAuth.ts
// simple client helper to manage access token in memory/localStorage and to call refresh endpoint
export let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  try {
    if (token) localStorage.setItem("accessToken", token);
    else localStorage.removeItem("accessToken");
  } catch (e) {
    // ignore (SSR or blocked)
  }
}

export function loadAccessTokenFromStorage() {
  try {
    const t = localStorage.getItem("accessToken");
    accessToken = t;
    return t;
  } catch (e) {
    return null;
  }
}

export async function refreshAccessToken() {
  // calls /api/refresh (sends cookies automatically). returns token or null.
  try {
    const res = await fetch("/api/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // important for cookies
    });
    const json = await res.json();
    if (json.ok && json.token) {
      setAccessToken(json.token);
      return json.token;
    }
    setAccessToken(null);
    return null;
  } catch (err) {
    setAccessToken(null);
    return null;
  }
}
