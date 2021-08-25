import React, {useState, useEffect} from 'react';
import {Alert, Linking, StatusBar} from 'react-native';

import styled from 'styled-components/native';
import {searchItem, removeItem, clearSelection} from '../component/Storage';

import EmptyBody from '../component/EmptyBody';
import {SwipeListView} from 'react-native-swipe-list-view';
import ListItem from '../component/main/ListItem';
import ExtendedMenu from '../component/main/ExtendedMenu';
import Footer from '../component/main/Footer';

const Page = styled.SafeAreaView`
  flex: 1;
`;

function Main({history}) {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState('');
  let timer = null;

  useEffect(search, [keyword]);

  function remove(item, ref) {
    Alert.alert(
      '확인',
      '해당 기록을 삭제할까요?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: async () => {
            ref.closeRow();
            setItems(await removeItem(item.id));
          },
        },
      ],
      {cancelable: true},
    );
  }

  async function add() {
    await clearSelection();
    history.push('/write');
  }

  async function view(item) {
    await clearSelection();
    history.push(`/view/${item.id}`);
  }

  function search() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      setItems(await searchItem(keyword));
    }, 200);
  }

  async function link(item) {
    const url = `https://msearch.shopping.naver.com/search/all?query=${item.item}`;
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      Alert.alert('알림', '검색을 지원하지 않는 기기 또는 OS 버전입니다.', [
        {text: '확인'},
      ]);
    }
  }

  return (
    <Page>
      <StatusBar barStyle="dark-content" />
      {items.length === 0 && <EmptyBody />}
      {items.length > 0 && (
        <SwipeListView
          data={items.map((item) => {
            item.key = item.id;
            return item;
          })}
          renderItem={(data, rowMap) => (
            <ListItem key={data.item.key} item={data.item} select={view} />
          )}
          renderHiddenItem={(data, rowMap) => (
            <ExtendedMenu
              data={data}
              rowMap={rowMap}
              remove={remove}
              search={link}
            />
          )}
          rightOpenValue={-150}
          recalculateHiddenLayout={true}
        />
      )}
      <Footer search={setKeyword} add={add} />
    </Page>
  );
}

export default Main;
