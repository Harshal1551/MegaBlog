import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import ThemeToggle from '../ThemeToggle';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'Dashboard', slug: '/dashboard', active: authStatus },
  ];

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <Logo width="50px" />
            </Link>
            <h1 className="text-2xl font-extrabold text-gray-800">
              <span className="text-blue-600">Mega</span>Blog
            </h1>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-4">
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
            {authStatus && (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600"
                    title="My Profile"
                  >
                    👤
                  </Link>
                </li>
                <li>
                  <ThemeToggle />
                </li>
                <li>
                  <LogoutBtn />
                </li>

              </>
            )}
          </ul>

          {/* Hamburger for mobile */}
          <button
              className={`md:hidden text-gray-700 z-50 transition-opacity ${
                menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={28} />
            </button>


          {/* Sidebar + Backdrop */}
          <div
            className={`fixed inset-0 z-40 transition-all duration-300 ${
              menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
          >
            {/* Blur transparent background */}
            <div
              className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            ></div>
            

            {/* Glassy Sidebar */}
            <div
              className={`absolute top-0 right-0 h-full w-64 bg-white/30 backdrop-blur-lg shadow-xl p-6 rounded-l-2xl transform transition-transform duration-300 ${
                menuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-600">Menu</h2>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={24} className="text-gray-700 hover:text-red-500" />
                </button>
              </div>

              <ul className="flex flex-col gap-4">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name}>
                        <button
                          onClick={() => {
                            navigate(item.slug);
                            setMenuOpen(false);
                          }}
                          className="block w-full text-left text-gray-800 hover:text-blue-600"
                        >
                          {item.name}
                        </button>
                      </li>
                    )
                )}
                {authStatus && (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="block text-gray-800 hover:text-blue-600"
                      >
                        👤 Profile
                      </Link>
                    </li>
                    <li>
                      <ThemeToggle />
                     </li>
                    <li>
                      <LogoutBtn />
                    </li>
                    
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
