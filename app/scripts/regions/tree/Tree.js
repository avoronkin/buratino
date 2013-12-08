'use strict';

define(function (require) {
    // var _ = require('underscore');
    var Factory = require('adviceFactory');
    var template = require('jst!./tree.html');
    var BaseView = require('core/views/BaseView');

    var BreadcrumbsView = Factory.register('tree', {
        base: 'view',

        initialize: function () {
            this.listenTo(this.collection, 'add remove change', this.render);
        },

        clobber: {
            template: template,

            data: function () {
                var data = {};
                var current = this.collection.getCurrent();
                var root = this.collection.getRoot(current);

                data.tree = this.collection.getTree(root) || {};
                data.template = this.template;
                console.log('tree data', data);

                return data;
            },

            toString: function () {
                return 'BreadcrumbsView';
            }
        }
    });

    return BreadcrumbsView;



});
