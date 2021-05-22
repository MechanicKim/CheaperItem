import React from 'react';
import {StatusBar} from 'react-native';

import styled from 'styled-components/native';
import {groupBy, setData} from '../component/Storage';

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

function Items(props) {
  const {items, select} = props;

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

export default class List extends React.Component {
  constructor(props) {
    super(props);

    let items;
    if (this.props.match.params.type === '1') {
      items = groupBy('mart').map((item) => item.mart);
    } else {
      items = groupBy('item').map((item) => item.item);
    }

    this.state = {items};
  }

  render() {
    const {items} = this.state;

    return (
      <Page>
        <StatusBar barStyle="dark-content" />
        <BackButton />
        {items.length === 0 && <EmptyBody />}
        {items.length > 0 && <Items items={items} select={this.select} />}
        <Footer back={this.props.history.goBack} />
      </Page>
    );
  }

  select = (item) => {
    let key;
    if (this.props.match.params.type === '1') {
      key = 'mart';
    } else {
      key = 'name';
    }

    setData(key, item);
    this.props.history.goBack();
  };
}
