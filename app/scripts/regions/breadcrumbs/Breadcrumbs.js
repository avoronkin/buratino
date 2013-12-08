'use strict';

define(function (require) {
    // var _ = require('underscore');
    var Factory = require('adviceFactory');
    var template = require('jst!./breadcrumbs.html');
    var BaseView = require('core/views/BaseView');

    var BreadcrumbsView = Factory.register('bredcrumbs', {
        base: 'view',

        initialize: function () {
            this.listenTo(this.collection, 'add remove change', this.render);
        },

        clobber: {
            template: template,

            data: function () {
                var data = {};
                data.breadcrumbs = this.collection.getBreadcrumbs();
                console.log('bredcrumbs data', data);
                return data;
            },

            toString: function () {
                return 'BreadcrumbsView';
            }
        }
    });

    return BreadcrumbsView;



});
