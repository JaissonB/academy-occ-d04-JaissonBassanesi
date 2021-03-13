define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['jquery', 'knockout', 'notifier', 'ccPasswordValidator', 'pubsub', 'CCi18n',
    'ccConstants', 'navigation', 'ccLogger', 'ccRestClient', 'ccConstants'],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function ($, ko, notifier, CCPasswordValidator, pubsub, CCi18n, CCConstants,
    navigation, ccLogger, ccRestClient, ccConstants) {
    "use strict";
    var widget;
    return {
      elementName: 'custom-bundle',
      produtosBundle: ko.observable(false),
      produtosBundleArray: ko.observableArray([]),
      onLoad: function (widgetModel) {
        widget = widgetModel;

        this.handleBundle(this);


      },
      beforeAppear: function (a) {


      },
      handleBundle: function (element) {
        
        var productDescription = widget.product().product.longDescription;

        productDescription = decodeURIComponent(productDescription).replace("<p>", "").replace("</p>", "").replace(new RegExp("&#39;", 'g'), '\'').replace('&nbsp;', ' ').replace(new RegExp("&quot;", 'g'), '\"');

        var productDescriptionJson = JSON.parse(productDescription);

        var productDescriptionSkuIds = "";
        try {
          productDescriptionJson.forEach(function (obj, i) {
            if ((productDescriptionJson.length - 1) === i) {
              productDescriptionSkuIds += obj.skuId;
            }
            else {
              productDescriptionSkuIds += obj.skuId + ",";
            }
  
          });
  
          ccRestClient.request(
            ccConstants.ENDPOINT_PRODUCTS_LIST_SKUS, {
            skuIds: productDescriptionSkuIds
          },
            function (result) {
              element.produtosBundleArray(result.items)
              element.produtosBundle(true)
  
            },
            function (error) {
              console.log(error);
  
            },
            null
          );
        } catch (error) {}


      }

    };
  }
);
