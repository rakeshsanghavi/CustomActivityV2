define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';
    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        var name = 7;
        var email = "akanksha.pandharkame@aress.com";
         payload.name = name;

        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "emailAddress": email
        }];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
        
        
        const axios = require('axios')

axios
  .post('https://api.pushy.me/push?api_key=d7d75e43ed88d5a8a4b27ed84548c78c687c0cf2e2c865e6790e58dd293c5ae5', {
    todo: '{
    "to": "d045904a12ebea17187dcc",
    "data": {
       "title": "Hello World POSTMAN!",
       "body": "Hello World!"
    },
    "notification": {
        "body": "Hello World \u270c"
    }
}'
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })
    }
           
});
