import { View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LoginFormProps } from '@types'
import { Button } from '@shared/components'
import styles from '../screens/LoginScreen.styles'

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onGoogleLogin, loading }) => {
    const [email, setEmail] = useState('test@gmail.com')
    const [password, setPassword] = useState('Test123@')

    return (

        <View style={styles.form}>
            
            {/* replace Email, Password, Login and Login with Google text in languages */}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button text="Login" onPress={() => onLogin(email, password)} isLoading={loading} />
            <Button text="Login with Google" onPress={onGoogleLogin} style={styles.secondaryButton} />
        </View>
    )
}

export default LoginForm
