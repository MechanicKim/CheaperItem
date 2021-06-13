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
  const {mart, select} = props;

  let unit = '단위정보 없음';
  if (mart.unit !== '' && mart.unitValue > 0) {
    unit = `${mart.unit}당 ${setComma(mart.unitValue)}원`;
  }

  return (
    <Wrap onPress={() => select(mart)} activeOpacity={1}>
      <Group>
        <Mart>{mart.name}</Mart>
      </Group>
      <PriceGroup>
        <Price>{setComma(mart.price)}원</Price>
        <Unit>{unit}</Unit>
      </PriceGroup>
    </Wrap>
  );
}
