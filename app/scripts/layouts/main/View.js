'use strict';

define(function (require) {
    var template = require('jst!./template.ejs');
    var TopMenu = require('core/menu/MenuView');
    var topMenuConfig = require('regions/topMenu/topMenuConfig');
    var Breadcrumbs = require('regions/breadcrumbs/Breadcrumbs');
    var Tree = require('regions/tree/Tree');
    var structure = require('models/structure');
    var _ = require('underscore');
    var Factory = require('adviceFactory');

    return Factory.register('layout', {
        base: 'view',

        template: template,

        initialize: function () {

            this.views = _.extend(this.views, {
                '#top-menu': {
                    constructor: TopMenu,
                    options: topMenuConfig
                },
                '#sidebar-menu': {
                    constructor: Tree,
                    options: {
                        collection: structure
                    }
                },
                '#breadcrumbs-menu': {
                    constructor: Breadcrumbs,
                    options: {
                        collection: structure
                    }
                }
            });

        },

        clobber: {

            toString: function () {
                return 'layout';
            }

        }
    });
});
