import React from 'react';
import {StatusBar} from 'react-native';

import styled from 'styled-components/native';
import {
  getItemNames,
  getMartNames,
  loadSelection,
  saveSelection,
} from '../component/Storage';

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
    this.state = {items: []};
  }

  async componentDidMount() {
    let items = [];
    if (this.props.match.params.type === '1') {
      items = await getItemNames();
    } else {
      items = await getMartNames();
    }
    this.setState({items});
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

  select = async (item) => {
    const selection = await loadSelection();

    if (this.props.match.params.type === '1') {
      selection.name = item;
    } else {
      selection.martName = item;
    }
    await saveSelection(selection);
    this.props.history.goBack();
  };
}
