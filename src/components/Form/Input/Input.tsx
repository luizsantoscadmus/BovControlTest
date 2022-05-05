import React from 'react';
import {TextInputProps} from 'react-native';

import Styles from './Input.styles';

function Input(props: TextInputProps) {
  return <Styles.Input {...props} />;
}

export default Input;
