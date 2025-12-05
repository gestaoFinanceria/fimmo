import { router } from 'expo-router'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

type AuthContextType = {
  user: string | undefined
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider ({ children }: PropsWithChildren) {
  const [user, setUser] = useState<string | undefined>()

  useEffect(() => {
    // resgate de info local
  }, [])

  const login = (token: string) => {
    setUser(token)
    // persistência local
    router.replace('/(tabs)')
  }

  const logout = () => {
    setUser(undefined)
    // limpeza de info em local
    router.replace('/entrada')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
