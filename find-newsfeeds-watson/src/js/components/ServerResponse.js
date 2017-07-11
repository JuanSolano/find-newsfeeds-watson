import React, { Component } from 'react';
import ApiTwitter from '../watsonLogic/apiTwitter';

class ServerResponse extends Component {

  constructor(props){
    super(props);
    this.state = {
      newsFeed: []
    };

    //
    ApiTwitter.newContentCall( (param) => {

      this.updateMessage( param.statuses );
    });
  }

  updateMessage( newsFeedList ) {

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

  //buscar noticias de corea del norte

  render(){
    function NewsBuilder(props){
      const newsFeed = props.news;
      const listItems = newsFeed.map( (news, index) => {
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

      <NewsBuilder news={this.state.newsFeed} />
    )
  };
}

export default ServerResponse;
