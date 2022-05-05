import React from 'react';
import Toast from 'react-native-toast-message';

import AppNavigator from './src/navigation/AppNavigator';
import ChecklistContext from './src/store/realm';
const {RealmProvider} = ChecklistContext;

export default function App() {
  if (!RealmProvider) {
    return null;
  }

  return (
    <RealmProvider>
      <AppNavigator />
      <Toast />
    </RealmProvider>
  );
}
