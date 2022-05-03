import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Button} from 'react-native';

function ItemScreen() {
  const navigation = useNavigation<any>();

  const onPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={onPress} title="Ir para a Home" />
    </View>
  );
}

export default ItemScreen;
