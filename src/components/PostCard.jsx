import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';

function PostCard({ $id, title, featuredimage, likes = 0, username }) {
  const imageUrl = appwriteService.getFileView(featuredimage);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentCount, setCommentCount] = useState(0);

  // Fetch comments count
  useEffect(() => {
    const fetchComments = async () => {
      const comments = await appwriteService.getCommentsForPost($id);
      setCommentCount(comments.length);
    };

    fetchComments();
  }, [$id]);

  const toggleLike = async (e) => {
    e.preventDefault();

    const change = liked ? -1 : 1;
    const updatedPost = await appwriteService.updatePostLikes($id, change);
    if (updatedPost) {
      setLiked(!liked);
      setLikeCount(updatedPost.likes);
    }
  };

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-300 p-4 transition-transform transform hover:scale-105 hover:shadow-xl mb-6 hover:bg-gray-50 relative">

        {/* 👤 User Name in Top-Left Corner */}
        <div className="absolute top-2 left-4 bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded-md shadow-sm">
          👤 {username || 'Unknown'}
        </div>

        {/* 🖼️ Image */}
        {featuredimage && (
          <div className="w-full aspect-video overflow-hidden rounded-xl mb-4 bg-gray-100">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 📝 Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>

        {/* ❤️ Like + 💬 Comment */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLike}
              className="flex items-center gap-1 focus:outline-none"
            >
              <Heart
                size={24}
                className={`
                  transition-colors duration-200 cursor-pointer
                  ${liked
                    ? "fill-red-500 stroke-red-500"
                    : "stroke-gray-600 hover:stroke-red-500"}
                `}
                style={{ cursor: 'pointer' }}
              />
              <span className="text-gray-700 text-sm">{likeCount}</span>
            </button>

            <div className="flex items-center gap-1">
              <MessageCircle
                size={24}
                className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
              />
              <span className="text-gray-700 text-sm">{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
