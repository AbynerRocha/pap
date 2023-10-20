import { View, Text, Platform, StatusBar } from 'react-native'
import React from 'react'
import { QueryClientProvider } from 'react-query'
import { AuthProvider, useAuth } from '../contexts/Auth/AuthContext'
import { clientQuery } from '../utils/queryClient'
import { Slot } from 'expo-router'
import { AppProvider } from '../contexts/App/AppContext'

export default function Layout() {
  return (
    <QueryClientProvider client={clientQuery}>
      <AppProvider>
        <AuthProvider>
            <View className={Platform.OS === 'android' ? 'mt-8 h-screen w-screen' : 'h-screen w-screen'}>
              <StatusBar barStyle='dark-content' backgroundColor='white' />
                <Slot />
            </View>
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  )
}