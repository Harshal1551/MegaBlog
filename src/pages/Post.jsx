import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;


    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    console.log("👤 Post:", post);
    console.log("👤 UserData:", userData);
    console.log("👀 isAuthor:", isAuthor);


    return post ? (
       <div className="py-8">
           <Container>
              <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          
                {/* Image Container */}
                <div className="relative">
                  <img
                    src={appwriteService.getFileView(post.featuredimage)}
                    alt={post.title}
                    className="w-full h-auto max-h-[600px] object-contain"
                  />
          
                  {isAuthor && (
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500 hover:bg-green-700">Edit</Button>
                      </Link>
                      <Button bgColor="bg-red-500 hover:bg-red-700" onClick={deletePost}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
          
                {/* Title */}
                <div className="px-6 py-4">
                  <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                     Title: {post.title}
                  </h1>
          
                  {/* Post Content */}
                  <div className="prose max-w-none text-gray-500">
                     {parse(post.content)}
                  </div>
                </div>
              </div>
            </Container>
        </div>         
    ) : null;
}