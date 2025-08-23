"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.replace("/login"), 1500);
    } else {
      const data = await res.json();
      setError(data.error || "Signup failed.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-gray-100">
      <div className="bg-white/90 rounded-2xl shadow-xl border-2 border-yellow-200 p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-lg border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button type="submit" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-yellow-500 hover:to-orange-600 transition">Sign Up</button>
          {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center mt-2">Account created! Redirecting...</p>}
        </form>
      </div>
    </main>
  );
}
