import React from 'react';
import {Switch as RNSwitch, SwitchProps} from 'react-native';

function Switch(props: SwitchProps) {
  // eslint-disable-next-line react-native/no-inline-styles
  return <RNSwitch style={{alignSelf: 'flex-start'}} {...props} />;
}

export default Switch;
