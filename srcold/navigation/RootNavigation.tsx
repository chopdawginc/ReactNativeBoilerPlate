import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const screenOptionStyle = { headerShown: false };

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen
          name={'Login'}
          component={() => (
            <Text style={{ color: 'black', fontSize: 60 }}>Login</Text>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
