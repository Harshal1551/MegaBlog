import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate('/login')
    } else if (!authentication && authStatus) {
      navigate('/dashboard')
    } else {
      setLoading(false)
    }
  }, [authStatus, navigate, authentication])

  return loading ? <h1 className="text-center mt-10">Loading...</h1> : <>{children}</>
}
