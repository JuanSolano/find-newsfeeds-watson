import React, { Component } from 'react';
import ApiWatson from './watsonLogic/apiWatson';

class Status extends Component {
  constructor () {
    super();

    let status;
    let response;

    this.state = {
      val: ":: > Waiting for Watson server"
    };

    // React promise callback
    ApiWatson.contactWatson().then((value) => {

      try {
        // if watson respond. All good
        response = ApiWatson.getResponse().output.text[0];
        status = ":: > Watson server ready.";

        this.setState({
          val: status
        })
      } catch (e) {
        console.log( " ApiWatson.getResponsePayload() : output not defined : empty message" );
      }
    })
  }

  render() {
    // If watson server is available then will render a message
    return (
      <p>{this.state.val}</p>
    );
  }
}

export default Status;
