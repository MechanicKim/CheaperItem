import React, {useState, useEffect} from 'react';
import {Alert, StatusBar} from 'react-native';

import styled from 'styled-components/native';
import {css} from 'styled-components';
import {
  saveItem,
  updateItem,
  saveSelection,
  loadSelection,
} from '../component/Storage';

import {BackButton} from 'react-router-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Footer from '../component/form/Footer';

const Page = styled.View`
  flex: 1;
`;

const Group = styled.View`
  flex-direction: row;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 17px;
  font-size: 17px;
  color: #212121;
  background-color: #ffffff;
`;

const UnitInput = css`
  flex: 1;
  padding: 20px;
  font-size: 17px;
  color: #212121;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #c7c7c7;
  border-bottom-width: 1px;
  border-bottom-color: #c7c7c7;
`;

const UnitInput1 = styled.TextInput`
  ${UnitInput}
  border-right-width: 1px;
  border-right-color: #c7c7c7;
`;

const UnitInput2 = styled.TextInput`
  ${UnitInput}
`;

const Button = styled.TouchableOpacity`
  padding-vertical: 17px;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  border-bottom-width: 1px;
  border-bottom-color: #c7c7c7;
`;

const ButtonText = styled.Text`
  font-size: 17px;
  color: #212121;
`;

function getStateData(data) {
  const result = {
    name: '',
    martName: '',
    price: '',
    unit: '',
    unitValue: '',
  };

  if (data) {
    result.name = data.name;
    if (data.mart) {
      result.martName = data.mart.name;
      result.price = data.mart.price + '';
      if (data.mart.unitValue !== 0) {
        result.unitValue = data.mart.unitValue + '';
      }
      result.unit = data.mart.unit;
    }
  }

  return result;
}

function Form({history, match}) {
  const stateData = getStateData(history.location.state);
  const [name, setName] = useState(stateData.name);
  const [martName, setMartName] = useState(stateData.martName);
  const [price, setPrice] = useState(stateData.price);
  const [unit, setUnit] = useState(stateData.unit);
  const [unitValue, setUnitValue] = useState(stateData.unitValue);

  useEffect(() => {
    reloadState();
  }, []);

  async function reloadState() {
    const data = await loadSelection();
    if (!data) {
      return;
    }

    setName(data.name);
    setMartName(data.martName);
    setPrice(data.price);
    setUnit(data.unit);
    setUnitValue(data.unitValue);
  }

  async function searchItem() {
    await saveSelection({name, martName, price, unit, unitValue});
    history.push('/list/1');
  }

  async function searchMart() {
    await saveSelection({name, martName, price, unit, unitValue});
    history.push('/list/2');
  }

  async function addItem() {
    const {id} = match.params;

    if (!name) {
      Alert.alert('알림', '품목을 입력하세요.', [{text: '확인'}]);
      return;
    }

    if (!price) {
      Alert.alert('알림', '가격을 입력하세요.', [{text: '확인'}]);
      return;
    }

    if (!martName) {
      Alert.alert('알림', '마트를 입력하세요.', [{text: '확인'}]);
      return;
    }

    if (!id) {
      const newItemID = await saveItem({
        martName,
        name,
        price,
        unitValue,
        unit,
      });
      history.replace(`/view/${newItemID}`);
      return;
    }

    const {mart} = history.location.state;
    await updateItem(+id, name, {
      id: mart ? mart.id : null,
      name: martName,
      price: +price,
      unitValue: +(unitValue || 0),
      unit,
    });
    history.goBack();
  }

  return (
    <Page>
      <StatusBar barStyle="dark-content" />
      <BackButton />
      <KeyboardAwareScrollView>
        <Input value={name} onChangeText={setName} placeholder="품목 이름" />
        <Button onPress={searchItem} activeOpacity={0.7}>
          <ButtonText>품목 가져오기</ButtonText>
        </Button>
        <Input
          value={martName}
          onChangeText={setMartName}
          placeholder="마트 이름"
        />
        <Button onPress={searchMart} activeOpacity={0.7}>
          <ButtonText>마트 가져오기</ButtonText>
        </Button>
        <Input
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="가격"
        />
        <Group>
          <UnitInput1
            value={unit}
            onChangeText={setUnit}
            placeholder="단위(100g)"
          />
          <UnitInput2
            value={unitValue}
            onChangeText={setUnitValue}
            keyboardType="numeric"
            placeholder="단위가격(174)"
          />
        </Group>
      </KeyboardAwareScrollView>
      <Footer back={history.goBack} add={addItem} />
    </Page>
  );
}

export default Form;
