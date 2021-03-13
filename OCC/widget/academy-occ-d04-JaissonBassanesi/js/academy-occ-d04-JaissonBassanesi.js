define(
	//-------------------------------------------------------------------
	// DEPENDENCIES
	//-------------------------------------------------------------------
	['jquery', 'knockout', 'ccConstants', 'ccRestClient', 'pubsub'],
  
	//-------------------------------------------------------------------
	// MODULE DEFINITION
	//-------------------------------------------------------------------
	function ($, ko, ccConstants, ccRestClient, pubsub) {
	  "use strict";
  
	  return {
		recomendacoes: ko.observableArray([]),
		show:ko.observable(true),

		onLoad: function (widget) {
			widget.ListProducts(widget)
		},
  
		beforeAppear: function () {

		},
  

		ListProducts: function(widget){
			
			ccRestClient.request(
				ccConstants.ENDPOINT_PRODUCTS_LIST_PRODUCTS,{
					fields: [
						"brand",
						"description",
						"displayName",
						"fullImageURLs",
						"id",
						"listPrice",
						"route",
						"salePrice"
					]
				}
				,
				function(result){
					var i = 0

					for(i; i < result.items.length; i++){
						if(result.items[i].brand == "Supremo Interiors" ){
							widget.show(false)
							widget.recomendacoes().push(result.items[i])
							widget.show(true)
						}						
					}
				},
				function(error){
					console.log(error)
				}
			)
			
		},

	  }
  
	}
)

// modern avelino dining table