import { ScrollView, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import { Label } from '@common'
import { useLocalization, useTheme } from '@contexts'
import { IAddUserFormSchema } from '../../../validations'
import { AuthService } from '../../../AppServices/AuthService'

const SignupScreen = () => {
  const { THEME_COLOR } = useTheme()
  const auth = new AuthService()
  const { t } = useLocalization()

  const handleRegister = async (values) => {

    console.log('values', values)

    try {
      const createdUser = await auth.register(values)
      console.log('User registered successfully:', createdUser)
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: THEME_COLOR.background }]}>
        <Label style={[styles.header, { color: THEME_COLOR.primary }]}>{t('welcome')}</Label>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            role: '',
            password: '',
          }}
          validationSchema={IAddUserFormSchema}
          onSubmit={(values) => handleRegister(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                style={[styles.input, { backgroundColor: THEME_COLOR.secondary, color: THEME_COLOR.text }]}
                placeholder="First Name"
                placeholderTextColor={THEME_COLOR.text}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
              />
              {touched.firstName && errors.firstName && (
                <Label style={styles.errorText}>{errors.firstName}</Label>
              )}

              <TextInput
                style={[styles.input, { backgroundColor: THEME_COLOR.secondary, color: THEME_COLOR.text }]}
                placeholder="Last Name"
                placeholderTextColor={THEME_COLOR.text}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
              />
              {touched.lastName && errors.lastName && (
                <Label style={styles.errorText}>{errors.lastName}</Label>
              )}

              <TextInput
                style={[styles.input, { backgroundColor: THEME_COLOR.secondary, color: THEME_COLOR.text }]}
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
                style={[styles.input, { backgroundColor: THEME_COLOR.secondary, color: THEME_COLOR.text }]}
                placeholder="Phone"
                placeholderTextColor={THEME_COLOR.text}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType="phone-pad"
              />
              {touched.phone && errors.phone && (
                <Label style={styles.errorText}>{errors.phone}</Label>
              )}

              <TextInput
                style={[styles.input, { backgroundColor: THEME_COLOR.secondary, color: THEME_COLOR.text }]}
                placeholder="Role"
                placeholderTextColor={THEME_COLOR.text}
                onChangeText={handleChange('role')}
                onBlur={handleBlur('role')}
                value={values.role}
              />
              {touched.role && errors.role && (
                <Label style={styles.errorText}>{errors.role}</Label>
              )}

              <TextInput
                style={[styles.input, { backgroundColor: THEME_COLOR.secondary, color: THEME_COLOR.text }]}
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
                style={[styles.loginButton, { backgroundColor: THEME_COLOR.accent }]}
                onPress={() => handleSubmit()}
              >
                <Label style={styles.buttonText}>Sign Up</Label>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  )
}

export default SignupScreen

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
})
