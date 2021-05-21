import React from 'react';
import {
  Alert, StatusBar
} from 'react-native';

import styled from 'styled-components/native';
import { css } from 'styled-components'
import Realm from 'realm';
import { getItemsByName, removeItem, setData } from '../component/Storage';

import { BackButton } from 'react-router-native';
import { SwipeListView } from 'react-native-swipe-list-view';
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

class Form extends React.Component {
  constructor(props) {
    super(props);

    const { name } = this.props.match.params;
    this.state = {
      items: getItemsByName(name)
    };
  }

  render() {
    const { items } = this.state;
    const { name } = this.props.match.params;

    return (
      <Page>
        <StatusBar barStyle="dark-content" />
        <BackButton />
        <Header>{name}</Header>
        {items.length > 0 &&
          <SwipeListView
            data={items.map(item => {
              item.key = item.id;
              return item;
            })}
            renderItem={(data, rowMap) => (
              <ListItem key={data.item.key} item={data.item} select={this.update} />
            )}
            renderHiddenItem={(data, rowMap) => (
              <ExtendedMenu data={data} rowMap={rowMap} remove={this.remove} />
            )}
            rightOpenValue={-75}
            recalculateHiddenLayout={true}
          />
        }
        <Footer back={this.props.history.goBack} itemName={name} add={this.add}  />
      </Page>
    );
  }

  update = item => {
    this.props.history.push(`/update/${item.id}`);
  }

  remove = (item, ref) => {
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
          onPress: () => {
            removeItem(item.id, items => {
              ref.closeRow();
              if (items.length === 0) {
                this.props.history.goBack();
              } else {
                this.setState({ items });
              }
            });
          }
        },
      ],
      { cancelable: true },
    );
  }

  add = () => {
    setData('name', this.props.match.params.name);
    this.props.history.push('/write');
  }
}

export default Form;
