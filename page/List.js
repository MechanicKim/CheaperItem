import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';

import styled from 'styled-components/native';
import {getNames, loadSelection, saveSelection} from '../component/Storage';

import {BackButton} from 'react-router-native';
import EmptyBody from '../component/EmptyBody';
import Footer from '../component/list/Footer';

const Page = styled.View`
  flex: 1;
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Item = styled.TouchableOpacity`
  padding: 10px;
  background-color: #eeeeee;
  border-bottom-color: #fafafa;
  border-bottom-width: 2px;
  border-bottom-left-radius: 15px;
`;

const Text = styled.Text`
  font-size: 17px;
  font-family: 'NotoSansKR-Regular';
  color: #212121;
`;

function Items({items, select}) {
  return (
    <Scroll>
      {items.map((item, index) => {
        return (
          <Item key={index} onPress={() => select(item)} activeOpacity={0.7}>
            <Text>{item}</Text>
          </Item>
        );
      })}
    </Scroll>
  );
}

export default function List({history, match}) {
  const [items, setItems] = useState([]);

  useEffect(updateItems, []);

  async function updateItems() {
    if (match.params.type === '1') {
      setItems(await getNames('itemNames'));
    } else {
      setItems(await getNames('martNames'));
    }
  }

  async function select(item) {
    const selection = await loadSelection();

    if (match.params.type === '1') {
      selection.name = item;
    } else {
      selection.martName = item;
    }
    await saveSelection(selection);
    history.goBack();
  }

  return (
    <Page>
      <StatusBar barStyle="dark-content" />
      <BackButton />
      {items.length === 0 && <EmptyBody />}
      {items.length > 0 && <Items items={items} select={select} />}
      <Footer back={history.goBack} />
    </Page>
  );
}
