import Link from "next/link";
export default function AdminHome() {
  return (
    <div className="text-black">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        Admin Dashboard <span className="animate-pulse">🔥</span>
      </h1>

      <p className="text-gray-600 mb-10">
        Welcome back! Here's a quick overview of your platform.
      </p>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* CARD 1 */}
      <Link href="/admin/products">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-200">
          <div className="text-blue-600 text-3xl mb-3">📦</div>
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-gray-600 mt-1">Manage all store products here.</p>
        </div>
</Link>
        {/* CARD 2 */}
       <Link href="/admin/users">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-200">
          <div className="text-purple-600 text-3xl mb-3">👤</div>
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-gray-600 mt-1">See your platform's user base.</p>
        </div>
       </Link>

        {/* CARD 3 */}
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-200">
          <div className="text-green-600 text-3xl mb-3">🛒</div>
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-gray-600 mt-1">Track and manage all orders.</p>
        </div>

      </div>

      {/* EXTRA SECTION */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-3">Quick Actions</h2>

        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
            <span>📦</span> Manage Products
          </li>

          <li className="flex items-center gap-2">
            <span>👤</span> Manage Users
          </li>

          <li className="flex items-center gap-2">
            <span>⚙️</span> Settings
          </li>
        </ul>
      </div>

    </div>
  );
}
