import React from 'react';

import RNPickerSelect, {PickerSelectProps} from 'react-native-picker-select';

const SELECT_STYLE = {
  paddingHorizontal: 10,
  paddingVertical: 12,
  backgroundColor: '#eee',
  borderRadius: 10,
  paddingRight: 30, // to ensure the text is never behind the icon
};

function Select(props: PickerSelectProps) {
  return (
    <RNPickerSelect
      placeholder={{}}
      style={{
        inputIOS: SELECT_STYLE,
        inputAndroid: SELECT_STYLE,
      }}
      {...props}
    />
  );
}

export default Select;
