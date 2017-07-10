import React, { Component } from 'react';
import Api from './watsonLogic/api';

class Status extends Component {
  constructor () {
    super();

    this.state = {
      val: ":: > Waiting for Watson server"
    };

    // React promise callback
    Api.contactWatson().then((value) => {

      let status;
      let response = Api.getResponsePayload().output.text[0];

      if( response === "watson:ready" ){

        status = ":: > Watson server is listening now.";
      } else {

        status = "Please check the server."
      }

      this.setState({
        val: status
      })
    })
  }

  // Execute on component is mount
  componentDidMount(){

    // Contact Watson server
    // Initial call
    Api.contactWatson();
  }

  render() {
    // If watson server is available then will render a message
    return (
      <p>{this.state.val}</p>
    );
  }
}

export default Status;
