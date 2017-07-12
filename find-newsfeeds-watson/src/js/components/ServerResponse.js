import React, { Component } from 'react';
import ApiTwitter from '../watsonLogic/apiTwitter';
import ApiWatson from '../watsonLogic/apiWatson';

class ServerResponse extends Component {

  constructor(props){
    super(props);
    this.state = {
      newsFeed: [],
      watsonMessage: ""
    };

    // Twitter response update
    ApiTwitter.newContentCall( (twitterServerResponse) => {

      let query={};
      let twitts=[];

      // DEBUG
      console.log( "twitterServerResponse:" );
      console.log( twitterServerResponse );

      try {

        query = twitterServerResponse.search_metadata.query;
        twitts = twitterServerResponse.statuses;

      } catch (e) {

        console.log( twitterServerResponse );
      }



      /**/
      if( twitts.length > 0 ){

        console.log( "Call ApiWatson.sendRequest(news_found);" );
        ApiWatson.sendRequest("newsFound");

        /**/
        this.showNewsFeed( twitts );
      } else {

        console.log( "Call ApiWatson.sendRequest(no_news_found);" );
        ApiWatson.sendRequest("notFound");

        /**/
        this.noNewsFeedToShow();
      }
    });

    // Watson response update
    ApiWatson.newContentCall( () => {

      let serverResponse = ApiWatson.getResponse();
      let nodes_visited = serverResponse.output.nodes_visited[0];
      let text = serverResponse.output.text[0];

      // DEBUG
      console.log( 'ApiWatson response:' );
      console.log( ApiWatson.getResponse() );

      //
      this.updateWatsonMessage (text);
    });
  }

  /**/
  showNewsFeed( newsFeedList ) {

    let newsFeed = [];

    newsFeedList.forEach((val, key)=>{

      try {

        let news = {
          date: val.created_at,
          content: val.text,
          url: val.entities.urls[0].url
        }

        newsFeed.push(news);

      } catch (e) {

        console.warn( "Some of the tweets doesn't have link." );
      }

    });

    this.setState({
      newsFeed: newsFeed
    });
  }

  /**/
  noNewsFeedToShow ( query ){

    this.setState({
      newsFeed: []
    });
  }

  // Update Watson message
  updateWatsonMessage = (message)=>{
    this.setState({
      watsonMessage: message
    });
  }

  //buscar noticias de corea del norte

  render(){

    function NewsBuilder(props){

      /**/
      const listItems = props.news.map( (news, index) => {
        return (
          <li key={index}>
            <a href={news.url} target="_new">
              <h2 className='newTitle'>{news.date}</h2>
              <p dangerouslySetInnerHTML={{ __html: news.content }} />
            </a>
          </li>
        )
      });

      return (
        <ul>
          {listItems}
        </ul>
      );
    }

    return(
      <div className="content-wrapper">

        <p> <span className="watson-says">Watson says: </span> {this.state.watsonMessage}</p>

        <div className="newsfeed-list">
          <NewsBuilder news={this.state.newsFeed} />
        </div>
      </div>
    )
  };
}

export default ServerResponse;
