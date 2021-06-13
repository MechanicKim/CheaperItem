import React from 'react';
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

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        name: '',
        marts: [],
      },
    };
  }

  async componentDidMount() {
    const {id} = this.props.match.params;
    this.setState({
      item: await getItem(id),
    });
  }

  render() {
    const {item} = this.state;
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
            renderItem={(data, rowMap) => (
              <ListItem mart={data.item} select={this.update} />
            )}
            renderHiddenItem={(data, rowMap) => (
              <ExtendedMenu data={data} rowMap={rowMap} remove={this.remove} />
            )}
            rightOpenValue={-75}
            recalculateHiddenLayout={true}
          />
        )}
        <Footer
          back={this.props.history.goBack}
          itemName={item.name}
          add={this.add}
        />
      </Page>
    );
  }

  update = (mart) => {
    const {item} = this.state;
    this.props.history.push(`/update/${item.id}`, {...item, mart});
  };

  remove = (mart, ref) => {
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
            const {id} = this.props.match.params;
            const item = await removeMart(+id, mart.id);
            if (item.marts.length === 0) {
              this.props.history.goBack();
            } else {
              ref.closeRow();
              this.setState({
                item,
              });
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  add = () => {
    const {item} = this.state;
    this.props.history.push(`/update/${item.id}`, item);
  };
}

export default Form;
