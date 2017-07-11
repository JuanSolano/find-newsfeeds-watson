/*
  Twitter API
  Find NewsFeed Watson
  Author: JB
  */

var ApiTwitter = (function() {

  let twitterResponse;
  let contentCallFN;
  let endPointUrl = "http://localhost:8000/api/";
  let message = endPointUrl + "tweets/";

  // Publicly accessible methods defined
  return {
    //
    sendRequest: sendRequest,
    //
    getTwitterResponse: function() {
      return twitterResponse;
    },
    //
    setTwitterResponse: function(response) {
      twitterResponse = JSON.parse(response);
    },
    newContentCall: function( fn ){
      contentCallFN = fn;
    }
  };

  /**
   * sendRequest
   * Send a message request to the server
   */
  function sendRequest(param) {

    let request;
    let searchRequest;
    let searchParams = {};

    searchParams.search = param;
    searchRequest = JSON.stringify(searchParams);
    request = xhrWatsonRequest( searchRequest );

    //
    request.then( ( http ) => {
      // DEBUG
      //console.log( http.readyState, http.status, http.responseText );
      //
      this.setTwitterResponse( http.responseText );
      contentCallFN( this.getTwitterResponse() );
    });

    return request;
  }

  // XHR Async
  // Promise async function
  function xhrWatsonRequest( params ) {
    return new Promise( (resolve, reject) => {

      let http;

      // Built http request
      http = new XMLHttpRequest();
      http.open('POST', message, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onload = () => resolve( http ) ;
      http.onerror = () => reject( http );

      // Send request
      http.send(params);
    });
  }
}());

export default ApiTwitter;
