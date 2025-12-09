import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Entrada () {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Entrar</Text>
      <View style={{gap: 16}}>
        <Button title='Go' onPress={() => {}}/>
        <Button title='Voltar' onPress={() => router.navigate('/')}/>
      </View>
    </View>
  );
}
