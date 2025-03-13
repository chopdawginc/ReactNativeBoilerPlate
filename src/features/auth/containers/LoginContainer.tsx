import React from 'react'
import LoginScreen from '../screens/LoginScreen'
import useLogin from '../hooks/useLogin'

const LoginContainer = () => {
    const { loginUser, onGoogleLogin, loading, error } = useLogin()

    return <LoginScreen onLogin={loginUser} onGoogleLogin={onGoogleLogin} error={error} loading={loading} />
}

export default LoginContainer
