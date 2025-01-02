import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import { Label } from '@common'
import { useLocalization, useTheme } from '@contexts'
import { ILoginFormSchema } from '../../../validations'
import { AuthService } from '../../../AppServices/AuthService'

const LoginScreen = () => {
    const { THEME_COLOR } = useTheme()
    const auth = new AuthService()
    const { t } = useLocalization()

    const handleLogin = async (values) => {
        console.log('Login values:', values)
        // toggleTheme()

        try {
            const user = await auth.login(values?.email, values?.password)
            console.log(user)
        } catch (error) {
            console.log('Error while logging in', error)
        }

    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={[styles.container, { backgroundColor: THEME_COLOR.background }]}>
                <Label style={[styles.header, { color: THEME_COLOR.primary }]}>{t('welcome')}</Label>

                <Formik
                    initialValues={{ email: '', password: '', isKeepLoggedIn: false }}
                    validationSchema={ILoginFormSchema}
                    onSubmit={(values) => handleLogin(values)}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                    }) => (
                        <>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        backgroundColor: THEME_COLOR.secondary,
                                        color: THEME_COLOR.text,
                                    },
                                ]}
                                placeholder="Email"
                                placeholderTextColor={THEME_COLOR.text}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {touched.email && errors.email && (
                                <Label style={styles.errorText}>{errors.email}</Label>
                            )}

                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        backgroundColor: THEME_COLOR.secondary,
                                        color: THEME_COLOR.text,
                                    },
                                ]}
                                placeholder="Password"
                                placeholderTextColor={THEME_COLOR.text}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                            />
                            {touched.password && errors.password && (
                                <Label style={styles.errorText}>{errors.password}</Label>
                            )}

                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => setFieldValue('isKeepLoggedIn', !values.isKeepLoggedIn)}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        values.isKeepLoggedIn && { backgroundColor: THEME_COLOR.accent },
                                    ]}
                                />
                                <Label style={[styles.checkboxLabel, { color: THEME_COLOR.text }]}>
                                    Keep me logged in
                                </Label>
                            </TouchableOpacity>
                            {touched.isKeepLoggedIn && errors.isKeepLoggedIn && (
                                <Label style={styles.errorText}>{errors.isKeepLoggedIn}</Label>
                            )}

                            <TouchableOpacity
                                style={[styles.loginButton, { backgroundColor: THEME_COLOR.accent }]}
                                onPress={() => handleSubmit()}
                            >
                                <Label style={styles.buttonText}>Login</Label>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    )
}

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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 14,
    },
})

export default LoginScreen
