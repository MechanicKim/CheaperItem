import React from 'react';

import styled from 'styled-components/native';
import { setComma } from '../Util';

const Wrap = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fafafa;
  border-bottom-color: #fafafa;
  border-bottom-width: 2px;
`;

const Group = styled.View`
  flex: 1;
  justify-content: center;
  border-bottom-left-radius: 15px;
  background-color: #eeeeee;
`;

const Item = styled.Text`
  padding-left: 15px;
  font-size: 17px;
  line-height: 19px;
  font-family: 'NotoSansKR-Regular';
  color: #212121;
`;

const Mart = styled.Text`
  padding-left: 15px;
  line-height: 17px;
  font-family: 'NotoSansKR-Regular';
  color: #424242;
`;

const Price = styled.Text`
  padding-left: 15px;
  font-size: 17px;
  line-height: 20px;
  font-family: 'NotoSansKR-Regular';
  color: #212121;
`;

const PriceGroup = styled.View`
  width: 140px;
  padding-vertical: 15px;
  background-color: #b2dfdb;
`;

export default function ListItem(props) {
  const { item, select } = props;

  return (
    <Wrap onPress={() => select(item)} activeOpacity={1}>
      <Group>
        <Item>{item.item}</Item>
      </Group>
      <PriceGroup>
        <Mart>{item.mart}</Mart>
        <Price>{setComma(item.price)}원</Price>
      </PriceGroup>
    </Wrap>
  );
}
