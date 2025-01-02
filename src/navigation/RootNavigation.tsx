import React from 'react'
import * as ui from '@modules'
import { SCREEN } from '@constant'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const screenOptionStyle = { headerShown: false }

export const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name={SCREEN.HOME} component={ui.HomeScreen} />
                <Stack.Screen name={SCREEN.SIGNUP} component={ui.SignupScreen} />
                <Stack.Screen name={SCREEN.LOGIN} component={ui.LoginScreen} />
                <Stack.Screen name={SCREEN.EDIT_PROFILE} component={ui.EditProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
