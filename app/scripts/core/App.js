'use strict';

define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');

    var App = function () {
        this._pages = [];
        this.initialize.apply(this, arguments);
    };

    _.extend(App.prototype, {
        initialize: function () {
        },
        getPages: function () {
            return this._pages;
        },
        addPage: function (page) {
            this._pages.push(page);
        },
        start: function () {
            console.log('start app', this)
            _.each(this.getPages(), function (page) {
                if (page.register) {
                    page.register();
                }
            });
        }

    });

    App.extend = Backbone.View.extend;

    return App;
});
