/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {NativeRouter, Route} from 'react-router-native';

import Main from './page/Main';
import View from './page/View';
import Form from './page/Form';
import List from './page/List';

class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Route exact path="/" component={Main} />
        <Route exact path="/view/:name" component={View} />
        <Route exact path="/write" component={Form} />
        <Route exact path="/update/:id" component={Form} />
        <Route exact path="/list/:type" component={List} />
      </NativeRouter>
    );
  }
}

export default App;
