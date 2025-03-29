import useUser from '../services/hooks/useUser'
import { LoginForm } from '../components/Auth/login-form'
import React from 'react'

const Login = () => {
    const {handleLogin, loading, errors } = useUser();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
