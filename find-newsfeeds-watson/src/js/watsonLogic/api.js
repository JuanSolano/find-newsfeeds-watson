var Api = (function() {
  var requestPayload;
  var responsePayload;

  let endPointUrl = "http://localhost:8000/api/";
  let message = endPointUrl + "message/";

  // Publicly accessible methods defined
  return {

    // Global request to Watson server
    sendRequest: sendRequest,

    // Initial Watson contact
    contactWatson: function(){
      return sendRequest(null, null, true);
    },
    //
    getRequestPayload: function() {
      return requestPayload;
    },
    //
    setRequestPayload: function(newPayloadStr) {
      requestPayload = JSON.parse(newPayloadStr);
    },
    //
    getResponsePayload: function() {
      return responsePayload;
    },
    //
    setResponsePayload: function(newPayloadStr) {
      responsePayload = JSON.parse(newPayloadStr);
    }
  };

  /**
   * sendRequest
   * Send a message request to the server
   */
  function sendRequest(text, context) {

    let params;
    let payloadToWatson = {};

    // Build request payload
    if (text) {
      payloadToWatson.input = {
        text: text
      };
    }
    if (context) {
      payloadToWatson.context = context;
    }

    params = JSON.stringify(payloadToWatson);

    //
    let request = xhrWatsonRequest( params );
    request.then( ( http ) => {

      //DEBUG
      //console.log( http.readyState , http.status, http.responseText );

      if (http.readyState === 4 && http.status === 200 && http.responseText.length > 0) {
        Api.setResponsePayload(http.responseText);
      }

      if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
        Api.setRequestPayload(params);
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

export default Api;
