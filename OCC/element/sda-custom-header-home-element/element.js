define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['jquery', 'knockout', 'notifier', 'ccPasswordValidator', 'pubsub', 'CCi18n', 
   'ccConstants', 'navigation', 'ccLogger'],
    
  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function ($, ko, notifier, CCPasswordValidator, pubsub, CCi18n, CCConstants,
    navigation, ccLogger) {
    "use strict";

    return {
      elementName: 'sda-custom-header-home-element',

    };
  }
);
