import React from 'react';

import Styles from './Field.styles';

function Field({children}: any) {
  return <Styles.Container>{children}</Styles.Container>;
}

export default Field;
