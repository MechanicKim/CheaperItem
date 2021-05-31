import React from 'react';
import styled from 'styled-components/native';
import {setComma} from '../Util';

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

const Mart = styled.Text`
  padding-left: 15px;
  font-size: 17px;
  line-height: 19px;
  font-family: 'NotoSansKR-Regular';
  color: #212121;
`;

const Price = styled.Text`
  padding-left: 15px;
  font-size: 17px;
  line-height: 19px;
  font-family: 'NotoSansKR-Regular';
  color: #212121;
`;

const Unit = styled.Text`
  padding-left: 15px;
  line-height: 18px;
  font-family: 'NotoSansKR-Regular';
  color: #424242;
`;

const PriceGroup = styled.View`
  width: 140px;
  padding-vertical: 15px;
  background-color: #b2dfdb;
`;

export default function ListItem(props) {
  const {item, select} = props;

  let unit = '단위정보 없음';
  if (item.unit !== '' && item.unitValue > 0) {
    unit = `${item.unit}당 ${setComma(item.unitValue)}원`;
  }

  return (
    <Wrap onPress={() => select(item)} activeOpacity={1}>
      <Group>
        <Mart>{item.mart}</Mart>
      </Group>
      <PriceGroup>
        <Price>{setComma(item.price)}원</Price>
        <Unit>{unit}</Unit>
      </PriceGroup>
    </Wrap>
  );
}
