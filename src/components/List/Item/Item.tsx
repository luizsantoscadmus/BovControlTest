import React from 'react';
import {Pressable} from 'react-native';
import moment from 'moment';

import Styles from './Item.styles';
import {IItemProps} from './Item.types';

function Item(props: IItemProps) {
  const {item, onPress} = props;

  const onItemPress = () => {
    onPress(item);
  };

  let dateString = `Cadastrado em ${moment(item.created_at).format(
    'HH:mm · DD/MM/YYYY',
  )}`;

  if (item.updated_at) {
    dateString = `Atualizado em ${moment(item.updated_at).format(
      'HH:mm · DD/MM/YYYY',
    )}`;
  }

  return (
    <Pressable onPress={onItemPress}>
      <Styles.Container>
        <Styles.TitleContainer>
          <Styles.Title>{item.from.name}</Styles.Title>
        </Styles.TitleContainer>

        <Styles.FarmInfo>
          {item.farmer.name} - {item.farmer.city}
        </Styles.FarmInfo>

        <Styles.DateTimeContainer>
          <Styles.DateTime>{dateString}</Styles.DateTime>
        </Styles.DateTimeContainer>
      </Styles.Container>
    </Pressable>
  );
}

export default Item;
