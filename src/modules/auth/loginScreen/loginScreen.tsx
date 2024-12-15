import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Label } from '@common'
import { PERMISSION } from '@constant'
import { usePermissions } from '@hooks'
import { useLocalization, useTheme } from '@contexts'

const LoginScreen = () => {

    const { THEME_COLOR, toggleTheme } = useTheme()
    const { permissions, requestPermission } = usePermissions()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { t, changeLanguage } = useLocalization()

    const handleLogin = () => {
        toggleTheme()
    }

    return (
        <View style={[styles.container, { backgroundColor: THEME_COLOR.background }]}>
            <Label style={[styles.header, { color: THEME_COLOR.primary }]}>{t('welcome')}</Label>
            <TextInput
                style={[styles.input, { backgroundColor: THEME_COLOR.secondary, color: THEME_COLOR.text }]}
                placeholder="Username"
                placeholderTextColor={THEME_COLOR.text}
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <TextInput
                style={[styles.input, { backgroundColor: THEME_COLOR.secondary, color: THEME_COLOR.text }]}
                placeholder="Password"
                placeholderTextColor={THEME_COLOR.text}
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <View>
                <Label>{JSON.stringify(permissions)}</Label>
                <Button text='Request camera' onPress={() => requestPermission(PERMISSION.CAMERA)} />
                <Button text='Request contacts' onPress={() => requestPermission(PERMISSION.CONTACTS)} />
                <Button text='Request gallery' onPress={() => requestPermission(PERMISSION.GALLERY)} />
                <Button text='Request location' onPress={() => requestPermission(PERMISSION.LOCATION)} />
                <Button text='Request notifications' onPress={() => requestPermission(PERMISSION.NOTIFICATIONS)} />
            </View>


            <TouchableOpacity
                style={[styles.loginButton, { backgroundColor: THEME_COLOR.accent }]}
                onPress={handleLogin}
            >
                <Label style={styles.buttonText}>Login</Label>

            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    loginButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default LoginScreen
