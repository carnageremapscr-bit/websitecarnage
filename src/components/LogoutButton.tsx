"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("carnage_user");
      localStorage.removeItem("carnage_user_email");
      router.replace("/login");
    }
  }
  return (
    <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-yellow-400 text-black rounded font-bold hover:bg-yellow-500 transition">Logout</button>
  );
}
