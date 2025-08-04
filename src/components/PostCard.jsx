import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredimage }) {
  const imageUrl = appwriteService.getFileView(featuredimage);

  // console.log("💡 PostCard Props →", { $id, title, featuredimage });
  // console.log("📷 Image URL →", imageUrl);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-300 p-4 transition-transform transform hover:scale-105 hover:shadow-xl mb-6 hover:bg-gray-50">
        {featuredimage && (
          <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
