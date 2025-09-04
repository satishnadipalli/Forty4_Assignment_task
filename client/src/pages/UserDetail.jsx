
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getUser, deleteUser } from "../services/api.js"

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getUser(id)
        setUser(data)
      } catch (e) {
        setError("User not found")
      }
    })()
  }, [id])

  const handleDelete = async () => {
    if (!confirm("Delete this user?")) return
    try {
      await deleteUser(id)
      navigate("/users")
    } catch (e) {
      alert("Failed to delete")
    }
  }

  if (error)
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 font-medium">{error}</p>
          <Link to="/users" className="inline-block mt-3 text-emerald-600 hover:text-emerald-700 font-medium">
            ← Back to Users
          </Link>
        </div>
      </div>
    )

  if (!user)
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <nav className="mb-6">
        <Link to="/users" className="text-emerald-600 hover:text-emerald-700 font-medium">
          ← Back to Users
        </Link>
      </nav>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header section */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 sm:px-6 py-4 sm:py-5 border-b border-emerald-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm sm:text-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{user.name}</h1>
                <p className="text-emerald-700 font-medium text-sm sm:text-base truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <Link
                to={`/users/${user._id}/edit`}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-center text-sm sm:text-base"
              >
                Edit User
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid gap-4 sm:gap-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Contact Information
              </h3>
              <div className="grid gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-gray-600 font-medium text-sm sm:text-base mb-1 sm:mb-0 sm:w-20 sm:flex-shrink-0">
                    Email:
                  </span>
                  <span className="text-gray-900 text-sm sm:text-base break-all sm:break-normal">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-600 font-medium text-sm sm:text-base mb-1 sm:mb-0 sm:w-20 sm:flex-shrink-0">
                      Phone:
                    </span>
                    <span className="text-gray-900 text-sm sm:text-base">{user.phone}</span>
                  </div>
                )}
                {user.company && (
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-600 font-medium text-sm sm:text-base mb-1 sm:mb-0 sm:w-20 sm:flex-shrink-0">
                      Company:
                    </span>
                    <span className="text-gray-900 text-sm sm:text-base">{user.company}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            {user.address && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                  Address
                </h3>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <div className="space-y-2">
                    {user.address.street && <p className="text-gray-900 text-sm sm:text-base">{user.address.street}</p>}
                    <p className="text-gray-900 text-sm sm:text-base">
                      {[user.address.city, user.address.zip].filter(Boolean).join(", ") || "No address provided"}
                    </p>
                    {(user.address.geo?.lat !== undefined || user.address.geo?.lng !== undefined) && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs sm:text-sm text-gray-600 break-all sm:break-normal">
                          <span className="font-medium">Coordinates:</span> {user.address.geo.lat || "N/A"},{" "}
                          {user.address.geo.lng || "N/A"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
