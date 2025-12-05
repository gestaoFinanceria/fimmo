import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Cadastro () {
  const { login } = useAuth()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Criar uma conta</Text>
      <View style={{gap: 16}}>
        <Button title='Go' onPress={() => login('token')}/>
        <Button title='Voltar' onPress={() => router.navigate('/')}/>
      </View>
    </View>
  );
}
