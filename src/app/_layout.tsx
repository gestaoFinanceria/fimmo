import { useAuthStore } from '@/store/useAuthStore'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function RootLayout () {
  const { user, validateSession } = useAuthStore()

  useEffect(()=>{
    (async () => {
      await validateSession()
    })()
  }, [])

  if (user === null) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large'/>
    </View>
  }

  return (
    <Stack screenOptions={{ animation: 'none' }}>
      <Stack.Protected guard={user === undefined}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen
          name='cadastro'
          options={{ title: 'Criar uma Conta', headerShown: false }}
        />
        <Stack.Screen
          name='entrada'
          options={{ title: 'Entrar', headerShown: false }}
        />
      </Stack.Protected>
      <Stack.Protected guard={user !== undefined}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  )
}
