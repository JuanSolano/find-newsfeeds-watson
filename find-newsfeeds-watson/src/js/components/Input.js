import React, { Component } from 'react';
import Api from '../watsonLogic/api';

class Input extends Component {

  constructor(){
    super();
    this.state = {
      value: '',
      watsonMessage: ''
    };

    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  newMessageFromWatson() {

  }

  inputChange(event) {

    this.setState({
      value: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();

    let context;
    let inputVal = this.state.value;
    let latestResponse = Api.getResponsePayload();
    if (latestResponse) {
      context = latestResponse.context;
    }

    // Send the user message
    Api.sendRequest(inputVal, context).then( ( http ) => {

      let response = Api.getResponsePayload().output.text[0];

      this.setState({
        watsonMessage: response
      });
    });
  }

  render(){

    return(

      <form onSubmit={this.formSubmit}>
        <input type="text" value={this.state.value} onChange={this.inputChange} />
        <div className="server-response">
          <p>{this.state.watsonMessage}</p>
        </div>
      </form>
    );
  };
}

export default Input;
