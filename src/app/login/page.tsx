"use client";

export const metadata = {
  title: "Login | Carnage Remaps",
  description: "Login to your Carnage Remaps account.",
};
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect if already logged in
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("carnage_user");
      if (user) {
        const parsed = JSON.parse(user);
        if (parsed.role === "admin") router.replace("/admin-dashboard");
        else router.replace("/dashboard");
      }
    }
  }, [router]);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Demo admin credentials
    if (email === "admin@carnage.com" && password === "admin123") {
      localStorage.setItem("carnage_user", JSON.stringify({ email, role: "admin" }));
      router.replace("/admin-dashboard");
    } else if (email && password) {
      localStorage.setItem("carnage_user", JSON.stringify({ email, role: "customer" }));
      router.replace("/dashboard");
    } else {
      setError("Please enter your email and password.");
    }
  }

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-gray-100">
        <div className="bg-white/90 rounded-2xl shadow-xl border-2 border-yellow-200 p-8 w-full max-w-md">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center">Login</h1>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
              autoComplete="current-password"
            />
            <button type="submit" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-yellow-500 hover:to-orange-600 transition">Login</button>
            {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
          </form>
        </div>
      </main>
    </>
  );
}
