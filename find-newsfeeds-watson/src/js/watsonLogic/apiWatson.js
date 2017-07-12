/*
  Watson API
  Find NewsFeed Watson
  Author: JB
  */
//import Config from "./config";
var ApiWatson = (function() {

  let requestPayload;
  let responsePayload;

  let request;
  let requestContext;

  let contentCallFN;
  const endPointUrl = "http://localhost:8000/api/";
  const message = endPointUrl + "watson/";

  // Publicly accessible methods defined
  return {

    // Global request to Watson server
    sendRequest: sendRequest,

    // REQUEST
    // @requestObj: JSON object
    setResponse: function(requestObj){
      request = requestObj;
    },
    // @return: JSON object
    getResponse: function(){
      return request;
    },

    // CONTEXT
    // @contextObj: JSON object
    setResponseContext: function(contextObj){
      requestContext = contextObj;
    },
    // @return: JSON object
    getResponseContext: function(){
      return requestContext;
    },

    // Initial Watson contact
    contactWatson: function(){
      return sendRequest();
    },

    // CB
    newContentCall: function( fn ){
      contentCallFN = fn;
    }
  };

  /**
   * sendRequest
   * Send a message request to the server
   */
  function sendRequest(text) {

    let params;
    let contextString;
    let contextObj = {};
    let context = ApiWatson.getResponseContext();

    // If text
    if (text) {
      contextObj.input = {
        text: text
      };
    }
    // If context
    if ( context ) {
      contextObj.context = context;
    }

    contextString = JSON.stringify( contextObj );

    //
    let request = xhrWatsonRequest( contextString );
    request.then( ( http ) => {

      //DEBUG
      //console.log( http.readyState , http.status, http.responseText );

      // Server response
      if (http.readyState === 4 && http.status === 200 && http.responseText.length > 0) {


        let responseJSON = JSON.parse(http.responseText);

        // DEBUG
        //console.log( "http.responseText " );
        //console.log( responseJSON );

        ApiWatson.setResponse( responseJSON );
        ApiWatson.setResponseContext( responseJSON.context );
        contentCallFN();
      }
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

export default ApiWatson;
