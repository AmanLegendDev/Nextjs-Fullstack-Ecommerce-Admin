import { getServerSession } from "next-auth";
import options from "@/auth.config";
import Link from "next/link";
import { Home, Package, Users, Settings, LogOut } from "lucide-react";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(options);

  if (!session || session.user.role !== "admin") {
    return (
      <div className="w-full h-screen flex items-center justify-center text-3xl font-semibold">
        Not Authorized ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0d0d0d] text-white flex flex-col px-6 py-8 shadow-xl border-r border-gray-800 backdrop-blur-xl">

        <h2 className="text-2xl font-bold mb-10 tracking-wide">
          Admin Panel 🔥
        </h2>

        <nav className="flex flex-col gap-4 font-medium text-gray-300">

          <Link
            href="/admin"
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-all duration-200"
          >
            <Home size={20} /> Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-all duration-200"
          >
            <Package size={20} /> Products
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-all duration-200"
          >
            <Users size={20} /> Users
          </Link>

          <Link
            href="/admin/setting"
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-all duration-200"
          >
            <Settings size={20} /> Settings
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-all duration-200"
          >
            <Settings size={20} /> Home
          </Link>

          <form action="/api/auth/signout" method="post" className="mt-10">
            <button
              className="flex items-center gap-3 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-200"
            >
              <LogOut size={20} /> Logout
            </button>
          </form>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}
