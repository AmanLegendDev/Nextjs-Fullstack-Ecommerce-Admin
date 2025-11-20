"use client";
import { useEffect, useState } from "react";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
        setloading(false);
      } catch (err) {
        console.log(err);
        setloading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="p-8 text-black">
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white border rounded-xl p-5 shadow hover:shadow-xl transition"
          >
            <img
              src={u.image}
              className="w-16 h-16 rounded-full border object-cover"
            />

            <div className="mt-4">
              <h2 className="text-xl font-semibold">{u.name}</h2>
              <p className="text-gray-600">{u.email}</p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-sm rounded-lg ${
                  u.role === "admin"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-900 text-white"
                }`}
              >
                {u.role.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
