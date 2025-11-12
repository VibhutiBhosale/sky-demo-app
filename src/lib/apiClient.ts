// src/lib/apiClient.ts
export interface ApiResponse<T> {
  data: T;
  errors?: { message: string }[];
}

interface GraphQLRequestOptions<T> {
  query: string;
  variables?: Record<string, any>;
  includeCredentials?: boolean;
}

/**
 * 🔹 Generic GraphQL API client
 * Handles fetch, JSON parsing, and error throwing consistently
 */
export async function graphqlRequest<T>({
  query,
  variables = {},
  includeCredentials = true,
}: GraphQLRequestOptions<T>): Promise<T> {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: includeCredentials ? "include" : "same-origin",
    body: JSON.stringify({ query, variables }),
  });

  const json: ApiResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error("Invalid GraphQL response");
  }

  return json.data;
}

/**
 * 🔹 Generic REST API client for plain JSON endpoints
 * e.g., /api/graphql/check-identifier
 */
export async function restRequest<T>(
  url: string,
  body: Record<string, any>,
  options?: { includeCredentials?: boolean }
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: options?.includeCredentials ? "include" : "same-origin",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data as T;
}
