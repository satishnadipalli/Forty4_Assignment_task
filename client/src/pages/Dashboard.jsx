"use client"

import { useEffect, useState } from "react"
import { getUsers, deleteUser } from "../services/api.js"
import UserCard from "../components/UserCard.jsx"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  const load = async () => {
    try {
      setLoading(true)
      const data = await getUsers()
      setUsers(data)
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return
    try {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u._id !== id))
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to delete")
    }
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.company && u.company.toLowerCase().includes(search.toLowerCase())),
  )

  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-center text-red-600">{error}</p>

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Users</h2>
        <Link to="/users/new" className="text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-700">
          Add User
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search users by name, email, or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />

      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-600">{search ? "No users match your search." : "No users yet."}</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((u) => (
            <UserCard key={u._id} user={u} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  )
}
