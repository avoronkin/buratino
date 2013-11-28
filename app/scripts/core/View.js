'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var template = require('jst!./templates/default.ejs');

    var BaseView = Backbone.View.extend({

        toString: function () {
            return 'BaseView';
        },

        template: template,

        data: function () {
            return {};
        },

        render: function () {
            var html = this.template(this.data(), {
                variable: 'data'
            });

            this.$el.html(html);
            return this;
        },

        close: function () {
            this.remove();
        },

    });

    return BaseView;

});
