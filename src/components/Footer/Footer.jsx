import React from "react";
import { Container } from "../index";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" from-blue-50 to-white border-t py-12 mt-20 text-gray-700">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">MegaBlog</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              MegaBlog is your creative space to write, share your thoughts, and connect with readers across the world. Whether it's tech, life, or poetry — we got you.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col space-y-2 text-sm">
            <h3 className="text-md font-semibold text-blue-700 mb-1">Quick Links</h3>
            <Link to="/" className="hover:text-blue-600 transition-all">
              Home
            </Link>
            <Link to="/all-posts" className="hover:text-blue-600 transition-all">
              Posts
            </Link>
            <Link to="/add-post" className="hover:text-blue-600 transition-all">
              Write
            </Link>
          </div>

          {/* Social / Contact */}
          <div className="flex flex-col space-y-3 text-sm">
            <h3 className="text-md font-semibold text-blue-700 mb-1">Connect</h3>
            <p className="text-gray-500">Email: contact@megablog.com</p>
            <div className="flex space-x-4">
              {/* Social icons (mock icons with emoji for now) */}
              <a href="#" className="text-gray-600 hover:text-blue-600 text-lg transition-all">🌐</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-lg transition-all">🐦</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-lg transition-all">📷</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t pt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} MegaBlog — Built with ❤️ for creators.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
