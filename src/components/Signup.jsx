import service from '../appwrite/config';
import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import conf from '../conf/conf';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

 const createUserIfNotExists = async (user) => {
  try {
    const response = await service.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUsersId,
      user.$id,  // Using user's Appwrite ID as the document ID
      {
        name: user.name,
        email: user.email,
        theme: "light",
      }
    );

    return response; // Return document (if needed)
  } catch (error) {
    if (error.message.includes("already exists")) return;
    console.error("Error creating user document:", error.message);
  }
}


  const create = async (data) => {
  setError("");
  try {
    const session = await authService.createAccount(data);
    if (session) {
      const userData = await authService.getCurrentUser();
      if (userData) {
        await createUserIfNotExists(userData);

        // Now store Appwrite document ID (same as $id) in userData object
        const fullUserData = {
          ...userData,
          userid: userData.$id, // Add userid key (used in ThemeToggle)
        };

        dispatch(login({ userData: fullUserData }));
        navigate("/dashboard");
      }
    }
  } catch (error) {
    setError(error.message || "Signup failed");
  }
};


  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-white rounded-2xl p-10 border border-gray-200 shadow-xl transition duration-300 hover:shadow-2xl">
        <div className="mb-6 flex justify-center animate-bounce-slow">
          <span className="inline-block w-full max-w-[90px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-6">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
