import Head from "next/head";

export default function AdminLogin() {
  return (
    <>
      <Head>
        <title>Admin Login | Carnage Remaps</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-yellow-100">
        <div className="bg-white/90 rounded-2xl shadow-xl border-2 border-yellow-400 p-8 w-full max-w-md">
          <h1 className="text-3xl font-extrabold mb-6 text-black text-center">Admin Login</h1>
          <form className="flex flex-col gap-4">
            <input type="email" placeholder="Admin Email" className="px-4 py-3 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <input type="password" placeholder="Password" className="px-4 py-3 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <button type="submit" className="bg-gradient-to-r from-black to-yellow-400 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-gray-900 hover:to-yellow-500 transition">Login</button>
          </form>
        </div>
      </main>
    </>
  );
}
