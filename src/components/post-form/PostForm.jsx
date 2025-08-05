import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const slugTransform = useCallback((value) => {
        return value
            ?.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-") || "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        let file = null;

        try {
            if (data.image?.[0]) {
                file = await appwriteService.uploadFile(data.image[0]);
            }

            if (post) {
                if (file && post.featuredimage) {
                    await appwriteService.deleteFile(post.featuredimage);
                }

                const updatedPost = await appwriteService.updatePost(
                    post.$id,
                    {
                        title: data.title,
                        content: data.content,
                        featuredimage: file ? file.$id : post.featuredimage,
                        status: data.status,
                    }
                );

                if (updatedPost) {
                    navigate(`/post/${updatedPost.$id}`);
                }
            } else {
                if (!file) {
                    throw new Error("Image is required to create a post.");
                }

                const newPost = await appwriteService.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    featuredimage: file.$id,
                    status: data.status,
                    userid: userData.$id,
                    username: userData.name,
                });

                if (newPost) {
                    navigate(`/post/${newPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Post submission error:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="bg-white rounded-xl shadow-lg p-6 md:p-10 mb-10 flex flex-wrap gap-6"
        >
            {/* Left - Main Content */}
            <div className="w-full md:w-2/3">
                <Input
                    label="Title"
                    placeholder="Enter your blog title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug"
                    placeholder="Slug will auto-generate"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue(
                            "slug",
                            slugTransform(e.currentTarget.value),
                            { shouldValidate: true }
                        )
                    }
                />

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right - Meta Info */}
            <div className="w-full md:w-1/3">
                <Input
                    label="Featured Image"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="mb-4"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">Current Image:</p>
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="w-full rounded-md border shadow object-cover max-h-64"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Post Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-blue-600"}
                    className="w-full mt-4 hover:scale-[1.02] transition-transform duration-200 ease-in-out"
                >
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}
