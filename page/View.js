import React, {useState, useEffect} from 'react';
import {Alert, StatusBar} from 'react-native';

import styled from 'styled-components/native';
import {getItem, removeMart} from '../component/Storage';

import {BackButton} from 'react-router-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import EmptyBody from '../component/EmptyBody';
import ListItem from '../component/view/ListItem';
import ExtendedMenu from '../component/view/ExtendedMenu';
import Footer from '../component/view/Footer';

const Page = styled.View`
  flex: 1;
`;

const Header = styled.Text`
  padding-vertical: 15px;
  font-size: 20px;
  text-align: center;
  color: #ffffff;
  background-color: #004c40;
`;

function Form({history, match}) {
  const [item, setItem] = useState({
    name: '',
    marts: [],
  });

  useEffect(updateState, []);

  async function updateState() {
    setItem(await getItem(match.params.id));
  }

  function update(mart) {
    history.push(`/update/${item.id}`, {...item, mart});
  }

  function remove(mart, ref) {
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
            await removeMart(item.id, mart.id);
            if (item.marts.length === 0) {
              history.goBack();
            } else {
              ref.closeRow();
              setItem(await getItem(item.id));
            }
          },
        },
      ],
      {cancelable: true},
    );
  }

  function add() {
    history.push(`/update/${item.id}`, item);
  }

  return (
    <Page>
      <StatusBar barStyle="dark-content" />
      <BackButton />
      <Header>{item.name}</Header>
      {item.marts.length === 0 && <EmptyBody />}
      {item.marts.length > 0 && (
        <SwipeListView
          data={item.marts.map((mart) => {
            mart.key = mart.id + '';
            return mart;
          })}
          renderItem={(data) => <ListItem mart={data.item} select={update} />}
          renderHiddenItem={(data, rowMap) => (
            <ExtendedMenu data={data} rowMap={rowMap} remove={remove} />
          )}
          rightOpenValue={-75}
          recalculateHiddenLayout={true}
        />
      )}
      <Footer back={history.goBack} itemName={item.name} add={add} />
    </Page>
  );
}

export default Form;
