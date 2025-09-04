import { Plus, Users } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/users" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
            <div className="p-2 sm:p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">User Management</h1>
              <p className="hidden sm:block text-xs text-gray-500 mt-0.5">Manage your team efficiently</p>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1 text-sm sm:text-base"
                  : "text-gray-600 hover:text-emerald-600 transition-colors pb-1 text-sm sm:text-base"
              }
            >
              <span className="hidden sm:inline">All Users</span>
              <span className="sm:hidden">Users</span>
            </NavLink>

            <Link to="/users/new">
              <button className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium transition-all hover:shadow-md text-sm sm:text-base">
                <Plus className="h-4 w-4 mr-1 sm:mr-1.5" />
                <span className="hidden sm:inline">Add User</span>
                <span className="sm:hidden">Add</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
