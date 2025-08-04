import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const userData = useSelector((state) => state.auth?.userData || null);

  const sampleImages = [
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2", // Tech Blog
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", // Writing/Notebook
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // Coding Setup
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 px-6 pt-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
          MegaBlog — <span className="text-blue-600">Where Ideas Bloom</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600 font-medium tracking-wide">
          Craft beautiful posts, share your thoughts, and connect with the world.
        </p>

        {!userData ? (
          <div className="flex justify-center gap-4 mt-6">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <Link
            to="/add-post"
            className="inline-block mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all shadow"
          >
            ✍️ Write Your Next Post
          </Link>
        )}
      </div>

      {/* Sample Blog Cards */}
      <div className="mt-16 max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {sampleImages.map((img, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            <img
              src={`${img}?auto=format&fit=crop&w=600&q=80`}
              alt="Sample Blog"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Blog Title</h3>
              <p className="text-sm text-gray-600 mt-1">
                A glimpse of what amazing content could look like.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
