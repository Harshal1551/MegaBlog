import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'
import PostCard from '../components/PostCard'

function Profile() {
  const { userData } = useSelector((state) => state.auth)
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await appwriteService.getPosts()
        
        const filtered = allPosts.documents.filter(
          (post) => post.userid === userData.$id
        )
        setUserPosts(filtered)
      } catch (error) {
        console.error("Failed to fetch user's posts", error)
      }
    }

    fetchPosts()
  }, [userData])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">👤 Hello, {userData?.name || 'User'}!</h1>

      <div className="mb-6 p-4 rounded-xl bg-white shadow">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>User ID:</strong> {userData.$id}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">📝 My Posts</h2>
      {userPosts.length === 0 ? (
        <p className="text-gray-500">No posts created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {userPosts.map((post) => (
               <PostCard key={post.$id} {...post} />
               ))}
  
        </div>
      )}
    </div>
  )
}

export default Profile
