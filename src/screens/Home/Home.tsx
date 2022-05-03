import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Button} from 'react-native';

function HomeScreen() {
  const navigation = useNavigation<any>();

  const onPress = () => {
    navigation.navigate('Item');
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={onPress} title="Ir para a tela de Item" />
    </View>
  );
}

export default HomeScreen;
