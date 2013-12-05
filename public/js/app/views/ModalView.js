define([
    'App',
    'backbone',
    'marionette',
    'jquery',

    'hbs!templates/modal',
    'views/modals/TermsView'
],
function(
    App,
    Backbone,
    Marionette,
    $,

    template,
    TermsView
){

    return Backbone.Marionette.Layout.extend( {
        template: template,

        buying: null,

        regions: {
            contentRegion: ".content"
        },

        events: {
            "click .blocker" : "closeMe",
            "click .header a" : "onNextClick"
        },

        _showTerms: function(){
            var view = new TermsView();

            this.popup(view, {
                title: "Terms & Privacy",
                icon: "hammer"
            });
        },

        

        /*
        *
        *    Main Modal Controls
        *
        */

        initialize:function (options) {
            App.vent.on('modal:closed', this._onModalClosed, this);
            App.vent.on('modal:resize', this.doResize, this);

            App.vent.on('modal:showTerms', this._showTerms, this);
        },

        onShow: function(){
            var self = this;
            $(window).resize(function() {
                self.doResize();
            });
        },

        popup: function(content, config){
            this.$('.header').removeClass('theme-error').removeClass('theme-success'); 

            if(config){
                this.$('.header h2').show();
                this.$('.header h2').html('<i class="icon-'+config.icon+'"></i> '+config.title);

                if(config.nextTitle){
                    this.$('.header a').show();
                    this.$('.header a').html(config.nextTitle+' <i class="icon-'+config.nextIcon+'">');
                }else{
                    this.$('.header a').hide();
                }

                if(config.theme)
                {
                    this.$('.header').addClass('theme-'+config.theme);
                }
            }else{
                this.$('.header h2').hide();
                this.$('.header a').hide();          
            }

            $('body').scrollTop(0);

            var self = this;
            this.contentRegion.close();
            if(content) this.contentRegion.show( content );
            $('#modal').show();
            setTimeout(function(){
                $('#modal').addClass('show');
                self.doResize();
                     
            }, 0);
            
        },

        doResize: function(){
            var contentHeight = $('#modal .content>*').height();
            var pageHeight = $(window).height();

            contentHeight = Math.min(contentHeight+100, pageHeight-150);

            $('#modal .panel').css('height', contentHeight);           
        },

        closeMe: function(){
            var self = this;
            $('#modal').removeClass('show');
            setTimeout(function(){
                $('#modal .panel').css('height', 0); 
                $('#modal').hide();
                self.contentRegion.close();
                App.vent.trigger('modal:closed');
            }, 500);
        }

        
    });
    
});