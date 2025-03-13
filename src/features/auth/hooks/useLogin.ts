import { useState } from 'react'
import { SCREEN } from '@constant'
import { NavigationProp } from '@types'
import { AuthService } from '@services'
import { useNavigation } from '@react-navigation/native'

const useLogin = () => {
    const Auth = new AuthService()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { navigate } = useNavigation<NavigationProp>()

    const [appleLoading, setAppleLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const loginUser = async (email: string, password: string) => {
        setLoading(true)
        setError(null)
        try {
            const user = await Auth.login(email, password)
            navigate(SCREEN.PROFILE)
            return user
        } catch (err) {
            setError('Invalid credentials')
        } finally {
            setLoading(false)
        }
    }

    const onGoogleLogin = async () => {
        try {
            setGoogleLoading(true)
            await Auth.loginWithGoogle()
        } catch (error) {
            console.log('ERROR:', error)
        } finally {
            setGoogleLoading(false)
        }
    }

    const onAppleLogin = async () => {
        try {
            setAppleLoading(true)
            await Auth.loginWithApple()
        } catch (error) { console.log('ERROR:', error) }
        finally { setAppleLoading(false) }
    }

    return { loginUser, onGoogleLogin, onAppleLogin, googleLoading, appleLoading, loading, error }
}

export default useLogin
