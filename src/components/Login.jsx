import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import service from '../appwrite/config'  // Import Appwrite service
import conf from '../conf/conf'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")


  const createUserIfNotExists = async (user) => {
    try {
      await service.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersId,
        user.$id,
        {
          name: user.name,
          email: user.email,
          theme: "light", 
        }
      );
    } catch (error) {
      if (error.message.includes("already exists")) return;
      console.error("Error creating user document:", error.message);
    }
  }

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          await createUserIfNotExists(userData)
          dispatch(authLogin({ userData }))
          navigate("/dashboard")
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-white rounded-2xl p-10 border border-gray-200 shadow-xl transition duration-300 hover:shadow-2xl">
        <div className="mb-6 flex justify-center animate-bounce-slow">
          <span className="inline-block w-full max-w-[90px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800">Welcome Back!</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-6">
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
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
