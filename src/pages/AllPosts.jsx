import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full py-10 bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] min-h-screen">
            <Container>
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Latest Posts
                </h1>

                {loading ? (
                    <div className="text-center text-lg text-gray-600">
                        Loading posts...
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-lg text-gray-500">
                        No posts found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
