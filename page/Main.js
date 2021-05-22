import React from 'react';
import {Alert, Linking, StatusBar} from 'react-native';

import styled from 'styled-components/native';
import {open, removeItems, searchItem, clearTemp} from '../component/Storage';

import EmptyBody from '../component/EmptyBody';
import {SwipeListView} from 'react-native-swipe-list-view';
import ListItem from '../component/main/ListItem';
import ExtendedMenu from '../component/main/ExtendedMenu';
import Footer from '../component/main/Footer';

const Page = styled.SafeAreaView`
  flex: 1;
`;

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      items: [],
      keyword: '',
    };
  }

  componentDidMount() {
    open((items) => {
      if (items.length === 0) {
        return;
      }
      this.setState({items});
    });
  }

  render() {
    const {items} = this.state;

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
              <ListItem
                key={data.item.key}
                item={data.item}
                select={this.view}
              />
            )}
            renderHiddenItem={(data, rowMap) => (
              <ExtendedMenu
                data={data}
                rowMap={rowMap}
                remove={this.remove}
                search={this.link}
              />
            )}
            rightOpenValue={-150}
            recalculateHiddenLayout={true}
          />
        )}
        <Footer search={this.search} add={this.add} />
      </Page>
    );
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
            removeItems(item.item, (items) => {
              ref.closeRow();
              this.setState({items});
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  add = () => {
    clearTemp();
    this.props.history.push('/write');
  };

  view = (item) => {
    clearTemp();
    this.props.history.push(`/view/${item.item}`);
  };

  link = async (item) => {
    const url = `https://msearch.shopping.naver.com/search/all?query=${item.item}`;
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      Alert.alert('알림', '검색을 지원하지 않는 기기 또는 OS 버전입니다.', [
        {text: '확인'},
      ]);
    }
  };

  search = (keyword) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.setState({
        items: searchItem(keyword),
      });
    }, 200);
  };
}

export default Main;
