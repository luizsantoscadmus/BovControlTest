import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const SafeArea = styled(SafeAreaView).attrs({
  edges: ['bottom', 'left', 'right'],
  flex: 1,
  backgroundColor: '#eee',
})``;

const FlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingTop: 20,
  },
});

const EmptyMessageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const EmptyMessage = styled.Text`
  font-size: 16px;
`;

export default {
  SafeArea,
  FlatList,
  EmptyMessageContainer,
  EmptyMessage,
};
