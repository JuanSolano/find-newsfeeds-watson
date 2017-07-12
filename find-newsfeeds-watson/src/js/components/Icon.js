/*
  Watson Icons
  Find NewsFeed Watson
  Author: JB
  */
import React, { Component } from 'react';

class Icon extends Component {

  constructor(props){
    super(props);
    this.state = {enable: false};

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(event) {
    event.preventDefault();
    this.setState({enable: true});
    alert("Start listening watson");
  }

  render(){
    return(
      <div className="icon-line" onClick={this.onClickHandler}></div>
    );
  };
}

export default Icon;
