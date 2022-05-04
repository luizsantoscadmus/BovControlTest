import React from 'react';
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
    </RealmProvider>
  );
}
