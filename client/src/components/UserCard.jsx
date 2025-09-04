
export default function UserCard({ user, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Delete ${user.name}? This can't be undone.`)) {
      onDelete(user._id)
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-emerald-700 font-medium text-sm">{getInitials(user.name)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            {user.company && <p className="text-sm text-gray-600">{user.company}</p>}
          </div>
        </div>

        
        <div className="flex gap-2">
          <a href={`/users/${user._id}`} className="text-sm text-emerald-600 hover:text-emerald-700 underline">
            View
          </a>
          <a href={`/users/${user._id}/edit`} className="text-sm text-blue-600 hover:text-blue-700 underline">
            Edit
          </a>
          <button onClick={handleDelete} className="text-sm text-red-600 hover:text-red-700 underline">
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <span>📧</span>
          {user.email}
        </p>

        {user.phone && (
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <span>📞</span>
            {user.phone}
          </p>
        )}

        {user.address?.city && (
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <span>📍</span>
            {user.address.city}
            {user.address.zip && `, ${user.address.zip}`}
          </p>
        )}
      </div>
    </div>
  )
}
