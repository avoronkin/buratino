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
                    pageLink: page.options.routeLink
                });
            }, this);
            Backbone.Collection.apply(this, arguments);
        }

    });

    return Structure;
});
