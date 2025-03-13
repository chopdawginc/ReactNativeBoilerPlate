import React from 'react'
import { SCREEN } from '@constant'
import { NavigationContainer } from '@react-navigation/native'
import { ProfileContainer, EditProfileContainer, LoginContainer } from '@features'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const screenOptionStyle = { headerShown: false }

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name={SCREEN.LOGIN} component={LoginContainer} />
                <Stack.Screen name={SCREEN.PROFILE} component={ProfileContainer} />
                <Stack.Screen name={SCREEN.EDIT_PROFILE} component={EditProfileContainer} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation
