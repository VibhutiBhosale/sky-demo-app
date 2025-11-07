// src/app/signup/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken } from "../../lib/clientAuth";

const SIGNUP_MUTATION = `
mutation Signup($name: String, $email: String!, $password: String!) {
  signup(name: $name, email: $email, password: $password) {
    token
    user { _id name email }
  }
}
`;

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
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
    else if (password.length < 8) e.password = "Password must be at least 8 characters";
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
        credentials: "include",
        body: JSON.stringify({ query: SIGNUP_MUTATION, variables: { name, email, password } }),
      });
      const json = await res.json();
      if (json.errors) {
        setServerError(json.errors[0].message || "Signup failed");
      } else {
        const token = json.data.signup.token;
        setAccessToken(token);
        router.push("/");
      }
    } catch (err: any) {
      setServerError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    // same markup as earlier
    <div className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
        <form onSubmit={onSubmit} noValidate>
          <label className="block mb-2 text-sm">Full name (optional)</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full border p-2 rounded mb-4" placeholder="Jane Doe"/>

          <label className="block mb-2 text-sm">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded mb-1" placeholder="you@example.com"/>
          {errors.email && <div className="text-red-600 text-sm mb-2">{errors.email}</div>}

          <label className="block mb-2 text-sm">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded mb-1" placeholder="At least 8 characters"/>
          {errors.password && <div className="text-red-600 text-sm mb-2">{errors.password}</div>}

          {serverError && <div className="text-red-700 text-sm mb-2">{serverError}</div>}

          <button type="submit" disabled={loading} className="w-full bg-sky-600 text-white p-2 rounded mt-4">
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          Already have an account? <a href="/login" className="text-sky-600">Sign in</a>
        </div>
      </div>
    </div>
  );
}
