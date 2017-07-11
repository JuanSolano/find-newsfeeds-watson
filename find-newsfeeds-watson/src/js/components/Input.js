import React, { Component } from 'react';
import Api from '../watsonLogic/api';
import ApiTwitter from '../watsonLogic/apiTwitter';

class Input extends Component {

  constructor(){
    super();
    this.state = {
      value: '',
      watsonMessage: ''
    };

    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.newMessageFromWatson = this.newMessageFromWatson.bind(this);
  }

  newMessageFromWatson() {

      let response = Api.getResponsePayload();

      this.setState({
        watsonMessage: response.output.text[0]
      });

      /*
      TODO: go an inspect all the nodes visited returned;
      */
      let nodesVisited = response.output.nodes_visited;
      if( nodesVisited[0] === "busqueda" ) {
        this.sendToSearch( response.input );
      }
  }

  sendToSearch( params ){

      /*
      TODO:
      extends the omitted words to accurate the search
      */

      let filtered = params.text.split(" ").filter(( word )=>{
        return word !== "busqueda" && word !== "buscar";
      });

      //
      ApiTwitter.sendRequest( filtered.toString() );
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

      this.newMessageFromWatson();
    });
  }

  render(){

    return(

      <div>
        <form onSubmit={this.formSubmit}>
          <input type="text" value={this.state.value} onChange={this.inputChange} />
          <div className="server-response">
            <p>{this.state.watsonMessage}</p>
          </div>
        </form>
      </div>
    );
  };
}

export default Input;
