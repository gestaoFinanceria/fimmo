import * as SecureStorage from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function setStorage<T>(key: string, value: T, secureStorage = false) {
  try {
    if (secureStorage) {
      await SecureStorage.setItemAsync(key, JSON.stringify(value));

    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error(`ERRO AO REGISTRAR EM ARMAZENAMENTO DE ${secureStorage ? 'SECURE' : 'ASYNC'} STORAGE: `, error);

    } else {
      console.error('ERRO DESCONHECIDO: ', String(error));
    }
  }
}

export async function getStorage<T>(key: string, secureStorage = false) {
  try {
    const result = secureStorage ? await SecureStorage.getItemAsync(key) : await AsyncStorage.getItem(key);

    if (!result) {
      return null;
    }

    return JSON.parse(result) as T;

  } catch (error) {
    if (error instanceof Error) {
      console.error(`ERRO AO RESGATAR DE ARMAZENAMENTO DE ${secureStorage ? 'SECURE' : 'ASYNC'} STORAGE: `, error);

    } else {
      console.error('ERRO DESCONHECIDO: ', String(error));
    }
    return null;
  }
}

export async function removeStorage(key: string, secureStorage = false) {
  try {
    if (secureStorage) {
      await SecureStorage.deleteItemAsync(key);
    } else {
      await AsyncStorage.removeItem(key);
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error(`ERRO AO REGISTRAR EM ARMAZENAMENTO DE ${secureStorage ? 'SECURE' : 'ASYNC'} STORAGE: `, error);

    } else {
      console.error('ERRO DESCONHECIDO: ', String(error));
    }
  }
}