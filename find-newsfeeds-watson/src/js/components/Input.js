/*
  Watson Input
  Find NewsFeed Watson
  Author: JB
  */
import React, { Component } from 'react';
import ApiWatson from '../watsonLogic/apiWatson';
import ApiTwitter from '../watsonLogic/apiTwitter';

class Input extends Component {

  constructor(){
    super();
    this.state = {
      value: ''
    };

    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.newMessageFromWatson = this.newMessageFromWatson.bind(this);
  }

  /*
  newMessageFromWatson
  */
  newMessageFromWatson() {

      let response = ApiWatson.getResponse();

      /*
      TODO: go an inspect all the nodes visited returned;
      */
      let nodesVisited = response.output.nodes_visited;
      if( nodesVisited[0] === "busqueda" ) {
        this.sendToSearch( response.input );
      }
  }

  /*
  sendToSearch
  */
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

    let inputVal = this.state.value;

    // Send the user message
    if(inputVal.length > 0) {
      ApiWatson.sendRequest(inputVal).then( ( http ) => {

        this.newMessageFromWatson();
      });

      this.setState({
        value: ""
      })
    }
  }

  render(){

    return(

      <form onSubmit={this.formSubmit}>
        <input type="text" value={this.state.value} onChange={this.inputChange} />
      </form>
    );
  };
}

export default Input;
