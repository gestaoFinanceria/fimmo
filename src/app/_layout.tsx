import { AuthProvider } from '@/context/AuthContext'
import { Stack } from 'expo-router'

export default function RootLayout () {
  return (
    <AuthProvider>
      <Stack screenOptions={{animation: 'none'}}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen
          name='cadastro'
          options={{ title: 'Criar uma Conta', headerShown: false }}
        />
        <Stack.Screen
          name='entrada'
          options={{ title: 'Entrar', headerShown: false }}
        />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  )
}
