import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useEffect} from 'react';
import {Button, FlatList} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

import List from '../../components/List';
import ChecklistContext from '../../store/realm';
import Checklist, {IChecklist} from '../../store/realm/schema';
const {useQuery, useRealm} = ChecklistContext;

import Styles from './Home.styles';
import useFetch from '../../hooks/useFetch';
import saveDataInLocal from '../../services/saveDataInLocal';
import {BASE_URL} from '../../services/utils';

function HomeScreen() {
  const navigation = useNavigation<any>();
  const result = useQuery(Checklist);
  const checklists = useMemo(() => result.sorted('created_at', true), [result]);
  const realm = useRealm();

  const {makeRequest, data, isLoading} = useFetch<IChecklist>(
    `${BASE_URL}checklists`,
  );

  const onPress = (item: IChecklist) => {
    navigation.navigate('Item', {id: item.id});
  };

  const renderItem = ({item}: any) => (
    <List.Item item={item} onPress={onPress} />
  );

  NetInfo.addEventListener(state => {
    // TODO: sync data when network goes online
    if (!state.isConnected) {
      Toast.show({
        type: 'error',
        text1: 'Sem conexão',
        text2:
          'Os dados serão salvos localmente e sincronizados quando houver conexão',
      });
    }
  });

  useEffect(() => {
    makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      saveDataInLocal(realm, data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return (
      <Styles.EmptyMessageContainer>
        <Styles.EmptyMessage>Carregando...</Styles.EmptyMessage>
      </Styles.EmptyMessageContainer>
    );
  }

  return (
    <Styles.SafeArea>
      {checklists.length === 0 && (
        <Styles.EmptyMessageContainer>
          <Styles.EmptyMessage>Nenhum item encontrado</Styles.EmptyMessage>
          <Button
            onPress={() => navigation.navigate('Item')}
            title="Cadastrar item"
          />
        </Styles.EmptyMessageContainer>
      )}
      {checklists.length > 0 && (
        <FlatList
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{paddingTop: 20}}
          data={checklists}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      )}
    </Styles.SafeArea>
  );
}

export default HomeScreen;
