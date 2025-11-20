"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function UserDashboard() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function loadSession() {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
    }
    loadSession();
  }, []);

  if (!session) {
    return <p className="text-center mt-20 text-lg">Loading...</p>;
  }

  const user = session.user;

  return (
    <div className="min-h-screen flex bg-gray-50 text-black">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-6 border-r border-gray-200">
        <h2 className="text-2xl font-bold text-black">My Account</h2>

        <nav className="flex flex-col gap-4 text-lg">
          <Link href="/user/dashboard" className="text-gray-800 hover:text-black">
            🏠 Dashboard
          </Link>
          <Link href="/user/orders" className="text-gray-800 hover:text-black">
            📦 My Orders
          </Link>
          <Link href="/user/wishlist" className="text-gray-800 hover:text-black">
            ❤️ Wishlist
          </Link>
          <Link
                      href="/"
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-all duration-200"
                    
                      > Home
                    </Link>
        </nav>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-auto bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-black">Welcome, {user.name.split(" ")[0]} 👋</h1>

        {/* Profile Card */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg max-w-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src="profile.png"
              alt="profile"
              className="w-20 h-20 rounded-full border-2 border-gray-300"
            />

            <div>
              <h3 className="text-xl font-semibold text-black">{user.name}</h3>
              <p className="text-gray-700">{user.email}</p>
              <span className="text-sm px-3 py-1 bg-black text-white rounded-lg mt-2 inline-block">
                Role: {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* ADMIN LINK */}
        {user.role === "admin" && (
          <Link
            href="/admin"
            className="inline-block mt-8 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Admin Panel
          </Link>
        )}
      </main>
    </div>
  );
}
