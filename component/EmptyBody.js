import React from 'react';
import styled from 'styled-components/native';

const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  margin: 10px;
  font-size: 17px;
  font-family: 'NotoSansKR-Regular';
`;

export default function EmptyBody() {
  return (
    <Body>
      <Text>기록이 없습니다.</Text>
    </Body>
  );
}
