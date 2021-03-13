define(
  ['jquery', 'knockout', 'ccRestClient', 'ccConstants', 'pubsub','navigation'],
  function ($, ko, ccRestClient, ccConstants, pubsub, navigation) {
    'use strict';

    return {
      elementName: 'custom-add-to-cart',
      onLoad: function (widget) {},

      beforeAppear: function (widget) {},
      handleConfirm: function (product,cart) {

        var skuSelected = this.selectedSku();
        cart.emptyCart();
        product.product.orderQuantity = 1;
        product.product.childSKUs = [skuSelected];
        $.Topic(pubsub.topicNames.CART_ADD).publishWith(
          product.product, [{ message: "success" }]);

        navigation.goTo('/checkout');

        
      }
    };// close return
  }// close function
);// close define
