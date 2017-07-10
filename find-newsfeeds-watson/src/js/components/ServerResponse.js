import React, { Component } from 'react';

class ServerResponse extends Component {

  constructor(props){
    super();
    this.state = {
      message: ""
    };

    this.updateMessage = this.updateMessage.bind(this);
  }

  updateMessage( messageFromWatson ) {
    this.setState({
      message: messageFromWatson
    });
  }

  render(){
    return(
      <p newmessage={this.updateMessage}>{this.state.message}</p>
    );
  };
}

export default ServerResponse;
