'use strict';

define(function (require) {
    // var _ = require('underscore');
    var Factory = require('adviceFactory');
    var template = require('jst!./breadcrumbs.html');
    var BaseView = require('core/views/BaseView');
    var _ = require('underscore');

    var BreadcrumbsView = Factory.register('bredcrumbs', {
        base: 'view',

        initialize: function () {
            this.listenTo(this.collection, 'add remove changed', this.render);
        },

        clobber: {
            template: template,

            data: function () {
                var data = {};
                data.breadcrumbs = [];

                var current = this.collection.getCurrent();
                console.log('current', current);

                if (current) {
                    var models = current.getBreadcrumbs();

                    if (models) {
                        data.breadcrumbs = _.map(models, function (model) {
                            return model.toJSON();
                        });
                    }
                }

                return data;
            },

            toString: function () {
                return 'Breadcrumbs';
            }
        }
    });

    return BreadcrumbsView;



});
