import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import ItemScreen from '../screens/Item';
import HeaderButton from './HeaderButton';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={({navigation}) => ({
            headerTitle: 'Bov Control',
            headerRight: () => <HeaderButton navigation={navigation} />,
          })}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Item"
          options={({route}) => ({
            headerBackTitle: 'Home',
            headerTitle: route.params ? 'Editar Item' : 'Novo Item',
          })}
          component={ItemScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
