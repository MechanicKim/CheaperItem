import React from 'react';

import styled from 'styled-components/native';

const Menu = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  border-bottom-color: #fafafa;
  border-bottom-width: 2px;
`;

const Item = styled.TouchableOpacity`
  width: 75px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  background-color: #00796b;
`;

const Text = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-family: 'GamjaFlower-Regular';
`;

export default function ExtendedMenu(props) {
  const { data, rowMap, remove, search } = props;

  return (
    <Menu>
      <Item onPress={() => remove(data.item, rowMap[data.item.key])} activeOpacity={0.7}>
        <Text>삭제</Text>
      </Item>
      <Item onPress={() => search(data.item)} activeOpacity={0.7}>
        <Text>검색</Text>
      </Item>
    </Menu>
  );
}
