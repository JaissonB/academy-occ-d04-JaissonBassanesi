

define(

    ['knockout', 'jquery', 'ccRestClient', 'ccLogger', 'pubsub', 'pageLayout/user'],
    function (ko, $, ccRestClient, ccLogger, pubsub, user) {
        return {

            msg: ko.observable('Mensagem'),

            PAGE_LAYOUT_LOADED: ko.observable(false),
            PAGE_READY: ko.observable(false),

            init: function( widget ){
                //console.log(widget);
            },

            showModal: function( id, onClose ){
                var modals = this.getOpenModals();
                $(id).css('z-index', 10000  + (modals.length*20) ).addClass('r-dec-show');
                $(id).on('hidden.bs.modal', function(event){
                    $(id).removeClass('r-dec-show');
                    $(id).unbind();
                    onClose();
                }.bind(this));
                $(id).modal('toggle');
            },

            getAllModals: function(){  return $(".r-dec-modal") },
            getOpenModals: function(){ return $(".r-dec-modal.r-dec-show") },


            onLoad: function (widget) {
                $.Topic(pubsub.topicNames.PAGE_READY).subscribe(function(data){
                    this.PAGE_READY(true);
                }.bind(this));
                // A message is published to this topic
                // when a shopper navigates from one page to another or refreshes the page.
                $.Topic(pubsub.topicNames.HISTORY_PUSH_STATE).subscribe(function(data){
                    //console.log(' 0 0 0 0 0 ');
                    //console.log(data);
                }.bind(this));
                $.Topic(pubsub.topicNames.PAGE_LAYOUT_LOADED).subscribe(function(data){
                    this.PAGE_LAYOUT_LOADED(true);
                    var rDecSite = data.data.global.site.siteInfo.repositoryId == '300001';
                    if(rDecSite){
                        $('body').addClass('sda-root-site');
                    }
                }.bind(this));
                
            },

            teste: function(){
                return this.msg();
            }
        };
    }
);