import React from 'react';

import Styles from './Label.styles';

function Label({children}: any) {
  return (
    <Styles.Container>
      <Styles.Text>{children}</Styles.Text>
    </Styles.Container>
  );
}

export default Label;
