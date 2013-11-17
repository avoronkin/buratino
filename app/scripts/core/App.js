'use strict';

define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var mediator = require('./mediator');

    var App = function (opt) {
        this._pages = [];
        this._mediator = mediator;
        if(opt && (opt.appUrl||opt.appUrl==='')){
            this.setAppUrl(opt.appUrl);
        }
        
        this.initialize.apply(this);
    };

    _.extend(App.prototype, {
        initialize: function () {
            console.log('init',this);
        },
        toString: function(){
            return 'App';
        },
        getPages: function () {
            return this._pages;
        },
        addPage: function (page) {
            this._pages.push(page);
        },
        getAppUrl: function(){
            return this._appUrl;
        },
        setAppUrl: function(url){
            this._appUrl = url; 
        },
        setMediator: function(mediator){
            this._mediator = mediator;
        },
        register: function (page) {
            console.log('register', this,this.getAppUrl())
            page.options.routeLink = this.getAppUrl() + page.options.routeLink;
            this._mediator.trigger('page:register',page);
        },
        start: function () {
            console.log('start '+this, this);
            _.each(this.getPages(), function (page) {
                this.register(page);
            },this);
        }

    });

    App.extend = Backbone.View.extend;

    return App;
});
