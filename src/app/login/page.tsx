// src/app/login/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken } from "../../lib/clientAuth"; // adjust path if necessary

const LOGIN_MUTATION = `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user { _id name email }
  }
}
`;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function validate() {
    const e: Record<string,string> = {};
    if (!email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookie to be set by server
        body: JSON.stringify({ query: LOGIN_MUTATION, variables: { email, password } }),
      });
      const json = await res.json();
      if (json.errors) {
        setServerError(json.errors[0].message || "Login failed");
      } else {
        const token = json.data.login.token;
        setAccessToken(token); // keep access token client-side (memory + localStorage)
        router.push("/");
      }
    } catch (err: any) {
      setServerError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    // same markup as earlier (omitted here for brevity). Use your previous UI.
    <div className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <form onSubmit={onSubmit} noValidate>
          <label className="block mb-2 text-sm">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded mb-1" placeholder="you@example.com"/>
          {errors.email && <div className="text-red-600 text-sm mb-2">{errors.email}</div>}

          <label className="block mb-2 text-sm">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded mb-1" placeholder="Enter your password" />
          {errors.password && <div className="text-red-600 text-sm mb-2">{errors.password}</div>}

          {serverError && <div className="text-red-700 text-sm mb-2">{serverError}</div>}

          <button type="submit" disabled={loading} className="w-full bg-sky-600 text-white p-2 rounded mt-4">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          Don't have an account? <a href="/signup" className="text-sky-600">Create one</a>
        </div>
      </div>
    </div>
  );
}
