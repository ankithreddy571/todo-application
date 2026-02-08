"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Registration failed (email may already exist)");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/todos");
    } catch {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-amber-50 text-stone-900 p-6">
      <div className="mx-auto mt-10 max-w-md rounded-md border border-amber-900/20 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-serif">Create Account</h1>
        <p className="mt-1 text-sm text-stone-600">Start tracking your todos.</p>

        <div className="mt-5 space-y-3">
          <input
            className="w-full rounded border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="w-full rounded border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6)"
            type="password"
          />
        </div>

        <button
          onClick={register}
          disabled={loading}
          className="mt-4 w-full rounded border border-stone-700 bg-stone-800 px-3 py-2 text-white hover:bg-stone-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        <p className="mt-4 text-sm text-stone-600">
          Already have account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
