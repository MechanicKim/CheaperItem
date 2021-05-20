import React from 'react';
import styled from 'styled-components/native';

const View = styled.View`
  flex-direction: row;
`;

const Input = styled.TextInput`
  flex: 1;
  margin: 0 10px 10px 10px;
  padding: 12px;
  font-size: 17px;
  color: #212121;
  background-color: #eeeeee;
  border-radius: 12px;
`;

const Button = styled.TouchableOpacity`
  margin-bottom: 10px;
  margin-right: 10px;
  padding-horizontal: 15px;
  justify-content: center;
  align-items: center;
  background-color: #00796b;
  border-radius: 12px;
`;

const Text = styled.Text`
  font-size: 15px;
  color: #ffffff;
  font-family: 'NotoSansKR-Regular';
`;

export default function Footer(props) {
  const { search, add } = props;

  return (
    <View>
      <Input onChangeText={search} placeholder="품목명으로 검색" />
      <Button onPress={add} activeOpacity={0.7}>
        <Text>추가</Text>
      </Button>
    </View>
  );
}
