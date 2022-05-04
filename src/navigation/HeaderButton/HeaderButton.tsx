import React from 'react';
import {Button} from 'react-native';

function HeaderButton({navigation}: {navigation: any}) {
  const onPress = () => {
    navigation.navigate('Item');
  };

  return <Button onPress={onPress} title="Novo +" />;
}

export default HeaderButton;
