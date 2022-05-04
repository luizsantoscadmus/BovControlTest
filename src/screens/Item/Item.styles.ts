import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const SafeArea = styled(SafeAreaView).attrs({
  edges: ['bottom', 'left', 'right'],
  flex: 1,
  paddingTop: 0,
  backgroundColor: '#fff',
})``;

const Container = styled.ScrollView.attrs({
  flex: 1,
  contentContainerStyle: {
    padding: 20,
  },
})``;

const Button = styled.Button``;

export default {
  SafeArea,
  Container,
  Button,
};
