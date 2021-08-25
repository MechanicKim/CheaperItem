import React from 'react';
import {Alert, Linking} from 'react-native';
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

export default function Footer({back, itemName, add}) {
  async function link() {
    const url = `https://msearch.shopping.naver.com/search/all?query=${itemName}`;
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      Alert.alert('알림', '검색을 지원하지 않는 기기 또는 OS 버전입니다.', [
        {text: '확인'},
      ]);
    }
  }

  return (
    <View>
      <Button onPress={back} activeOpacity={0.7}>
        <Text>목록</Text>
      </Button>
      <Button onPress={link} activeOpacity={0.7}>
        <Text>검색</Text>
      </Button>
      <Button onPress={add} activeOpacity={0.7}>
        <Text>추가</Text>
      </Button>
    </View>
  );
}
