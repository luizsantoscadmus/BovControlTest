import styled from 'styled-components/native';

const Container = styled.View.attrs({
  flex: 1,
  marginBottom: 10,
  marginLeft: 15,
  marginRight: 15,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor: '#fff',
  borderRadius: 10,
})``;

const TitleContainer = styled.View`
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-weight: bold;
`;

const FarmInfo = styled.Text`
  font-size: 13px;
  color: #111;
`;

const DateTimeContainer = styled.View`
  margin-top: 5px;
`;

const DateTime = styled.Text`
  font-size: 12px;
  color: #111;
`;

export default {
  Container,
  TitleContainer,
  Title,
  FarmInfo,
  DateTimeContainer,
  DateTime,
};
