'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var mediator = require('./mediator');

    var Structure = Backbone.Collection.extend({
        constructor: function () {
            this._mediator = mediator;
            this._mediator.on('page:register', function (page) {
                this.add({
                    menuName: page.options.menuName,
                    route: page.options.route,
                    name: page.options.name,
                    parentName: page.options.parentName,
                    active: false
                });
            }, this);
            
            this._mediator.on('page:change', this.onPageChange, this);
            Backbone.Collection.apply(this, arguments);
        },
        onPageChange: function(obj){
            var activeItems = this.filter(function(model){
                return model.get('active') === true; 
            })
            var item = this.find(function(model){
                return model.get('name') === obj.view.options.name; 
            });
            this.invoke('set', {'active': false});
            if(item){
               item.set('active', true); 
            }
        }

    });

    return Structure;
});
