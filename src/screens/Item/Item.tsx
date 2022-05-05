import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useMemo} from 'react';
import Toast from 'react-native-toast-message';
import ChecklistSchema, {
  IChecklist,
  TChecklistType,
} from '../../store/realm/schema';

import Styles from './Item.styles';

import ChecklistContext from '../../store/realm';
import Form from '../../components/Form';
import moment from 'moment';
import updateItem from '../../services/updateItem';
import saveItem from '../../services/saveItem';

const {useRealm} = ChecklistContext;

function ItemScreen() {
  const navigation = useNavigation<any>();
  const {params} = useRoute<any>();

  const realm = useRealm();

  const [farmerName, setFarmerName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmCity, setFarmCity] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [type, setType] = useState<TChecklistType>('BPA');
  const [milkAmount, setMilkAmount] = useState<string>('');
  const [headAmount, setHeadAmount] = useState<string>('');
  const [hadSupervision, setHadSupervision] = useState(false);

  const isValid = useMemo(
    () =>
      farmerName &&
      farmName &&
      farmCity &&
      supervisor &&
      type &&
      milkAmount &&
      headAmount,
    [farmerName, farmName, farmCity, supervisor, type, milkAmount, headAmount],
  );

  const toggleSwitch = () => setHadSupervision(previousState => !previousState);

  const sanitizeNumericInput = (value: string, setFn: Function) => {
    const sanitizedValue = value.replace(/\D/gi, '');
    setFn(sanitizedValue);
  };

  const getItem = () => {
    const {id} = params;
    const item = realm
      .objects<IChecklist>(ChecklistSchema.schema.name)
      .filtered(`id == ${id}`)[0];
    return item;
  };

  const loadItem = () => {
    if (params) {
      const item = getItem();

      setFarmerName(item.from.name);
      setFarmName(item.farmer.name);
      setFarmCity(item.farmer.city);
      setSupervisor(item.to.name);
      setMilkAmount(item.amount_of_milk_produced.toString());
      setHeadAmount(item.number_of_cows_head.toString());
      setHadSupervision(item.had_supervision);
      setType(item.type);
    }
  };

  const save = async () => {
    if (params) {
      let item = getItem();

      realm.write(() => {
        item.farmer = {name: farmName, city: farmCity};
        item.from = {name: farmerName};
        item.to = {name: supervisor};
        item.amount_of_milk_produced = parseInt(milkAmount, 10);
        item.number_of_cows_head = parseInt(headAmount, 10);
        item.updated_at = moment.utc().format();
      });

      updateItem(item);

      Toast.show({
        type: 'success',
        text1: 'Item atualizado',
      });
    } else {
      let data = {
        type,
        amount_of_milk_produced: parseInt(milkAmount, 10),
        number_of_cows_head: parseInt(headAmount, 10),
        had_supervision: hadSupervision,
        farmer: {name: farmName, city: farmCity},
        from: {name: farmerName},
        to: {name: supervisor},
      };

      realm.write(() => {
        realm.create(
          ChecklistSchema.schema.name,
          ChecklistSchema.generate(data, realm),
        );
      });

      const item = realm
        .objects<IChecklist>(ChecklistSchema.schema.name)
        .sorted('id', true)[0];

      saveItem({
        id: item.id,
        ...data,
        created_at: item.created_at,
        updated_at: '',
      });

      Toast.show({
        type: 'success',
        text1: 'Item cadastrado',
      });

      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    loadItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styles.SafeArea>
      <Styles.Container>
        <Form.Field>
          <Form.Label>Nome do/a Fazendeiro/a</Form.Label>
          <Form.Input onChangeText={setFarmerName} value={farmerName} />
        </Form.Field>

        <Form.Field>
          <Form.Label>Nome da Fazenda</Form.Label>
          <Form.Input onChangeText={setFarmName} value={farmName} />
        </Form.Field>

        <Form.Field>
          <Form.Label>Nome da Cidade</Form.Label>
          <Form.Input onChangeText={setFarmCity} value={farmCity} />
        </Form.Field>

        <Form.Field>
          <Form.Label>Nome do/a Supervisor/a</Form.Label>
          <Form.Input onChangeText={setSupervisor} value={supervisor} />
        </Form.Field>

        <Form.Field>
          <Form.Label>Quantidade de Leite Produzido</Form.Label>
          <Form.Input
            onChangeText={value => sanitizeNumericInput(value, setMilkAmount)}
            value={milkAmount}
            keyboardType="numeric"
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Quantidade de Cabeças de Gado</Form.Label>
          <Form.Input
            onChangeText={value => sanitizeNumericInput(value, setHeadAmount)}
            value={headAmount}
            keyboardType="numeric"
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Teve Supervisão no Mês em Curso?</Form.Label>
          <Form.Switch
            onValueChange={toggleSwitch}
            value={hadSupervision}
            disabled={!!params}
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Tipo</Form.Label>
          <Form.Select
            value={type}
            onValueChange={setType}
            items={[
              {label: 'BPA', value: 'BPA'},
              {label: 'Antibiótico', value: 'Antibiotico'},
              {label: 'BPF', value: 'BPF'},
            ]}
            disabled={!!params}
          />
        </Form.Field>

        <Styles.Button onPress={save} title="Salvar" disabled={!isValid} />
      </Styles.Container>
    </Styles.SafeArea>
  );
}

export default ItemScreen;
