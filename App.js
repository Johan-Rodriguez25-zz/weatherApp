import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import Search from './src/components/search'
import Weather from './src/components/weather'

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.SlideFromRightIOS
                }}
            >
                <Stack.Screen
                    name='Search'
                    component={Search} />
                <Stack.Screen
                    name='Weather'
                    component={Weather} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App