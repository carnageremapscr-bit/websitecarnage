"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="w-full bg-black/90 text-yellow-400 py-4 px-8 border-b-2 border-yellow-400 shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-extrabold tracking-widest text-yellow-400 drop-shadow-lg">
          <Link href="/">Carnage Remaps</Link>
        </div>
        <button
          className="md:hidden text-yellow-400 text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row gap-8 text-lg font-bold items-center absolute md:static top-16 left-0 w-full md:w-auto bg-black/95 md:bg-transparent p-4 md:p-0 z-30`}
        >
          <Link href="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link href="/services" className="hover:text-yellow-300 transition">
            Services
          </Link>
          <Link href="/about" className="hover:text-yellow-300 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-yellow-300 transition">
            Contact
          </Link>
          <Link href="/faq" className="hover:text-yellow-300 transition">
            FAQ
          </Link>
          <Link
            href="/testimonials"
            className="hover:text-yellow-300 transition"
          >
            Testimonials
          </Link>
          <Link href="/blog" className="hover:text-yellow-300 transition">
            Blog
          </Link>
          <Link
            href="/terms"
            className="hover:text-yellow-300 transition"
          >
            Terms & Privacy
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-yellow-400 text-black rounded font-bold hover:bg-yellow-500 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
              <Link href="/signup" className="hover:text-yellow-300 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
