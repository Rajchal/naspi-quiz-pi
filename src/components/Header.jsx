import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <span className="font-bold text-lg">NASPi</span>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/questions">Questions</Link>
        <Link to="/videos">Videos</Link>
      </div>
    </nav>
  )
}

