import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-semibold mb-2">404 - Not Found</h1>
      <p className="text-gray-600 mb-4">The page you're looking for does not exist.</p>
      <Link to="/users" className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">Go Home</Link>
    </div>
  )
}
