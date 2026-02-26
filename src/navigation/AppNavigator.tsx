import React from 'react'
import { DashboardScreen } from '../screens/DashboardScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Dashboard: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Dashboard'
        screenOptions={{
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerStyle: { backgroundColor: '#007AFF' },
        }}>
        <Stack.Screen name='Dashboard' component={DashboardScreen} options={{ title: 'Mis Tareas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}