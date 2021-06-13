import React from 'react';
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

class Form extends React.Component {
  constructor(props) {
    super(props);

    const item = this.props.history.location.state;
    const formData = {
      name: '',
      martName: '',
      price: '',
      unit: '',
      unitValue: '',
    };

    if (item) {
      formData.name = item.name;
    }

    if (item && item.mart) {
      formData.martName = item.mart.name;
      formData.price = item.mart.price + '';
      if (item.mart.unitValue !== 0) {
        formData.unitValue = item.mart.unitValue + '';
      }
      formData.unit = item.mart.unit;
    }

    this.state = formData;
  }

  async componentDidMount() {
    const selection = await loadSelection();
    if (!selection) {
      return;
    }
    this.setState(selection);
  }

  render() {
    const {martName, name, price, unitValue, unit} = this.state;

    return (
      <Page>
        <StatusBar barStyle="dark-content" />
        <BackButton />
        <KeyboardAwareScrollView>
          <Input
            value={name}
            onChangeText={this.onChangeName}
            placeholder="품목 이름"
          />
          <Button onPress={this.searchItem} activeOpacity={0.7}>
            <ButtonText>품목 가져오기</ButtonText>
          </Button>
          <Input
            value={martName}
            onChangeText={this.onChangeMart}
            placeholder="마트 이름"
          />
          <Button onPress={this.searchMart} activeOpacity={0.7}>
            <ButtonText>마트 가져오기</ButtonText>
          </Button>
          <Input
            value={price}
            onChangeText={this.onChangePrice}
            keyboardType="numeric"
            placeholder="가격"
          />
          <Group>
            <UnitInput1
              value={unit}
              onChangeText={this.onChangeUnit}
              placeholder="단위(100g)"
            />
            <UnitInput2
              value={unitValue}
              onChangeText={this.onChangeUnitValue}
              keyboardType="numeric"
              placeholder="단위가격(174)"
            />
          </Group>
        </KeyboardAwareScrollView>
        <Footer back={this.props.history.goBack} add={this.addItem} />
      </Page>
    );
  }

  onChangeMart = (martName) => {
    this.setState({martName});
  };

  searchMart = async () => {
    await saveSelection(this.state);
    this.props.history.push('/list/2');
  };

  onChangeName = (name) => {
    this.setState({name});
  };

  searchItem = async () => {
    await saveSelection(this.state);
    this.props.history.push('/list/1');
  };

  onChangePrice = (price) => {
    this.setState({price: price.replace(/[^0-9]/g, '')});
  };

  onChangeUnit = (unit) => {
    this.setState({unit});
  };

  onChangeUnitValue = (unitValue) => {
    this.setState({unitValue: unitValue.replace(/[^0-9]/g, '')});
  };

  addItem = async () => {
    const {id} = this.props.match.params;
    const {martName, name, price, unitValue, unit} = this.state;

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
      this.props.history.replace(`/view/${newItemID}`);
      return;
    }

    const {mart} = this.props.history.location.state;
    await updateItem(+id, name, {
      id: mart ? mart.id : null,
      name: martName,
      price: +price,
      unitValue: +(unitValue || 0),
      unit,
    });
    this.props.history.goBack();
  };
}

export default Form;
