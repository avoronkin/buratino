'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var mediator = require('./mediator');

    var Structure = Backbone.Collection.extend({
        constructor: function () {
            this._mediator = mediator;
            this._mediator.on('page:register', function (page) {
                console.log('structure add page', page);
                this.add({
                    pageName: page.options.linkText,
                    pageLink: page.options.routeLink,
                    routeName: page.options.routeName,
                    active: false
                });
            }, this);
            
            this._mediator.on('page:change', this.onPageChange, this);
            Backbone.Collection.apply(this, arguments);
        },
        onPageChange: function(obj){
            console.log('structure o page change',obj.view.options.routeName); 
            var activeItems = this.filter(function(model){
                return model.get('active') === true; 
            })
            var item = this.find(function(model){
                return model.get('routeName') === obj.view.options.routeName; 
            });
            this.invoke('set', {'active': false});
            if(item){
               item.set('active', true); 
            }
        }

    });

    return Structure;
});
