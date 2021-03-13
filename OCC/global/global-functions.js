define(
  ['knockout', 'jquery', 'ccRestClient'],
  function (ko, $, ccRestClient) {
    return {

      onLoad: function () {
        var widget = this;
        widget.applyAppends();
      },

      beforeAppear: function (page) {
        // var widget = this;
      },

      applyAppends: function () {
        $('head').append('<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet">');
      },

      /**
       * returns an object with formatted request options based on the arguments received
       */
      getExternalRequestOptions: function () {
        return {
          url: arguments[0],
          method: arguments[1],
          headers: arguments[2],
          data: arguments[3],
          timeout: arguments[4],
          dataType: arguments[5],
          contentType: arguments[6]
        };
      },

      /**
       * returns an object with formatted request options based on the arguments received
       */
      getOCCSRequestOptions: function () {
        return {
          endpoint: arguments[0],
          data: arguments[1],
          param1: arguments[2],
          param2: arguments[3],
          param3: arguments[4],
          param4: arguments[5],
          beforeSendCallback: arguments[6],
          scope: arguments[7]
        };
      },

      /**
       * safely tries to parse value of unknown type
       * returns a JS object if it succeeds, otherwise returns the value it received
       * @param {*} data value of unknown type to be parsed
       */
      safeJSONParse: function (data) {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error('safeJSONParse - data is not a string');
          return data;
        }
      },

      /**
       *
       * @param {*} options an object with the JQuery AJAX request parameters
       * returns a JQuery promise
       */
      makeExternalRequest: function (options) {
        var deferred = $.Deferred();
        var globalContext = this;

        $.ajax({
          url: options.url,
          method: options.method,
          headers: options.headers,
          data: options.data,
          timeout: options.timeout,
          success: function (response) {
            deferred.resolve(globalContext.safeJSONParse(response));
          },
          error: function (xhr, textStatus, error) {
            deferred.reject(xhr.responseText);
          },
          dataType: options.dataType,
          contentType: options.contentType
        });

        return deferred.promise();
      },

      /**
       *
       * @param {*} options an object with the ccRestClient request parameters
       * returns a JQuery promise
       */
      makeOCCSRequest: function (options) {
        var deferred = $.Deferred();
        var globalContext = this;

        ccRestClient.request(
          options.endpoint,
          options.data,
          function (response) {
            deferred.resolve(globalContext.safeJSONParse(response));
          },
          function (error) {
            deferred.reject(error);
          },
          options.param1,
          options.param2,
          options.param3,
          options.param4,
          options.beforeSendCallback,
          options.scope
        );

        return deferred.promise();
      }
    };
  }
);
