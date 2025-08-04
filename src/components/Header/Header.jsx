import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'Dashboard', slug: '/dashboard', active: authStatus },

  ]

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo + Brand Name */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Logo width="50px" />
            </Link>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
              <span className="text-blue-600">Mega</span>Blog
            </h1>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center gap-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-1.5 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
