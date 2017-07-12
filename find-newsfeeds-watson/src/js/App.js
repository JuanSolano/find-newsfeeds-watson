/*
  Watson API
  Find NewsFeed Watson
  Author: JB
  */
import React, { Component } from 'react';
import Input from './components/Input';
import Icon from './components/Icon';
import ServerResponse from './components/ServerResponse';
// CSS
import '../css/App.scss';

class App extends Component {

  render() {

    return (

      <div className="newsFeed">
        <Icon />
        <div className="input-line">
          <Input />
        </div>
        <div className="server-response">
          <ServerResponse />
        </div>
      </div>
    );
  }
}

export default App;
