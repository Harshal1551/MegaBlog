import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/index"; 

function Dashboard() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-3xl w-full">
        {/* Header section with logo and branding */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Logo width="60px" />
          <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
            Mega<span className="text-gray-800">Blog</span>
          </h1>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, Creator! 🎉
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            You've successfully logged in. Start writing a blog post, catch up on others', or manage your contributions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6">
          <button
            onClick={() => navigate("/add-post")}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow transition-all"
          >
            ✍️ Write a New Post
          </button>
          <button
            onClick={() => navigate("/all-posts")}
            className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 shadow transition-all"
          >
            📚 Explore All Posts
          </button>
        </div>

        {/* Future Features Section */}
        <div className="text-center text-sm text-gray-400">
          More features coming soon: My Posts, Profile Page, Reader Stats 📈
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
