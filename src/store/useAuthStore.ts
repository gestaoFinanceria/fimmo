import { UserFormType } from '@/sharedTypes/UserTypes';
import axios from 'axios';
import { create } from 'zustand';
import { getStorage, removeStorage, setStorage } from '../utils/manageStorage';
const API_USER = ''

type UserInfoType = {
  id: string;
  nome: string;
}

type LoginResponseType = {
  id: string;
  nome: string;
  token: string;
  refreshToken: string;
}

interface AuthStoreType {
  user: UserInfoType | undefined | null;
  register: (userInfo: UserFormType) => Promise<string | null>;
  login: (email: string, senha: string) => Promise<string | null>;
  logout: () => Promise<void>;
  validateSession: () => Promise<void>;
}

async function saveAuthStorage (data: LoginResponseType, set: any) {
  const authUser: UserInfoType = { id: data.id, nome: data.nome }
  await setStorage('token', data.token, true)
  await setStorage('refreshToken', data.refreshToken, true)
  await setStorage('user', authUser)
  set({ user: authUser })
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  login: async (email: string, senha: string): Promise<string | null> => {
    try {
      const { data } = await axios.post<LoginResponseType>(`${API_USER}/login`, { email, senha })
      await saveAuthStorage(data, set)
      return null

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.code ?? '500'
      }
      return '500'
    }
  },
  register: async (userFormData: UserFormType): Promise<string | null> => {
    try {
      await axios.post(`${API_USER}/register`, { userFormData })
      return await useAuthStore.getState().login(userFormData.email, userFormData.senha)

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error.code ?? '500'
      }
      return '500'
    }
  },

  logout: async () => {
    await removeStorage('token', true)
    await removeStorage('refreshToken', true)
    await removeStorage('user')
    set({ user: undefined })
  },

  validateSession: async () => {
    try {
      const refreshToken = await getStorage('refreshToken', true)
      if (refreshToken) {
        const { data } = await axios.post<LoginResponseType>(`${API_USER}/refresh`, { refreshToken })
        await saveAuthStorage(data, set)
      } else {
        set({ user: undefined })
        return
      }
    } catch (error: unknown) {
      await useAuthStore.getState().logout()
    }

  }
}))