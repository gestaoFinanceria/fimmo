import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function App () {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Base</Text>
      <View style={{gap: 16}}>
        <Button title='Entrar' onPress={() => router.navigate('/entrada')}/>
        <Button title='Criar conta' onPress={() => router.navigate('/cadastro')}/>
      </View>
    </View>
  );
}
