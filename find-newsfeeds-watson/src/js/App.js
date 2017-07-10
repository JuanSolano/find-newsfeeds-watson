import React, { Component } from 'react';
// COMPONENTS
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
      </div>
    );
  }
}

export default App;
