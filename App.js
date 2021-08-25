import React from 'react';
import {NativeRouter, Route} from 'react-router-native';

import Main from './page/Main';
import View from './page/View';
import Form from './page/Form';
import List from './page/List';

export default function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Main} />
      <Route exact path="/view/:id" component={View} />
      <Route exact path="/write" component={Form} />
      <Route exact path="/update/:id" component={Form} />
      <Route exact path="/list/:type" component={List} />
    </NativeRouter>
  );
}
