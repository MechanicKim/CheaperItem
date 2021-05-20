import React from 'react';
import styled from 'styled-components/native';

const View = styled.View`
  flex-direction: row;
  padding-horizontal: 5px;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 10px;
  margin-horizontal: 5px;
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
  const { back, add } = props;

  return (
    <View>
      <Button onPress={() => back()} activeOpacity={0.7}>
        <Text>취소</Text>
      </Button>
      <Button onPress={add} activeOpacity={0.7}>
        <Text>저장</Text>
      </Button>
    </View>
  );
}
