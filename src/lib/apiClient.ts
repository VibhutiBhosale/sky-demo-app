// -----------------------------------------------------
// 🔹 GraphQL API Types
// -----------------------------------------------------

export interface GraphQLErrorItem {
  message: string;
}

export interface ApiResponse<T> {
  data: T | null;
  errors?: GraphQLErrorItem[];
}

export interface GraphQLRequestOptions<TVars> {
  query: string;
  variables?: TVars;
  includeCredentials?: boolean;
}

// -----------------------------------------------------
// 🔹 Generic GraphQL Client (no any)
// -----------------------------------------------------

export async function graphqlRequest<TData, TVars = Record<string, unknown>>({
  query,
  variables,
  includeCredentials = true,
}: GraphQLRequestOptions<TVars>): Promise<TData> {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: includeCredentials ? "include" : "same-origin",
    body: JSON.stringify({ query, variables }),
  });

  const json: ApiResponse<TData> = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error("Invalid GraphQL response");
  }

  return json.data;
}

// -----------------------------------------------------
// 🔹 Generic REST JSON Client (no any)
// -----------------------------------------------------

export async function restRequest<TData, TBody extends Record<string, unknown>>(
  url: string,
  body: TBody,
  options?: { includeCredentials?: boolean }
): Promise<TData> {
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

  return (await res.json()) as TData;
}
