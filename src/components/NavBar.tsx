"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function NavBar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("carnage_user");
      setIsLoggedIn(!!user);
      // If not logged in and on a protected page, redirect to login
  const protectedRoutes = ["/dashboard", "/admin"];
      if (!user && protectedRoutes.includes(window.location.pathname)) {
        router.replace("/login");
      }
    }
  }, [router]);
  function handleLogout() {
    localStorage.removeItem("carnage_user");
    setIsLoggedIn(false);
    router.replace("/login");
  }
  return (
    <nav className="w-full bg-black/90 text-yellow-400 py-4 px-8 border-b-2 border-yellow-400 shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-extrabold tracking-widest text-yellow-400 drop-shadow-lg">
          <Link href="/">Carnage Remaps</Link>
        </div>
        <div className="hidden md:flex gap-8 text-lg font-bold items-center">
          <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link href="/services" className="hover:text-yellow-300 transition">Services</Link>
          <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
          <Link href="/contact" className="hover:text-yellow-300 transition">Contact</Link>
          <div className="relative group">
            <button className="hover:text-yellow-300 transition flex items-center gap-1">More <span>▼</span></button>
            <div className="absolute right-0 mt-2 w-48 bg-black/95 border border-yellow-400 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-40">
              <Link href="/faq" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">FAQ</Link>
              <Link href="/testimonials" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">Testimonials</Link>
              {/* Gallery link removed */}
              <Link href="/blog" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">Blog</Link>
              <Link href="/terms" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">Terms & Privacy</Link>
              {/* Admin Dashboard link removed: dashboard is now unified and role-based */}
              <Link href="/login" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">Login</Link>
              <Link href="/signup" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">Sign Up</Link>
              <Link href="/contact" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition rounded-b">Contact</Link>
            </div>
          </div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-yellow-400 text-black rounded font-bold hover:bg-yellow-500 transition">Logout</button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
