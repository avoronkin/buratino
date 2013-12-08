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
            this.regionManager.addRegion('#top-menu');
            this.regionManager.addRegion('#sidebar-menu');
            this.regionManager.addRegion('#breadcrumbs-menu');

            this.regions = _.extend(this.regions, {
                '#top-menu': {
                    view: TopMenu,
                    viewOptions: topMenuConfig
                },
                '#sidebar-menu': {
                    view: Tree,
                    viewOptions: {
                        collection: structure
                    }
                },
                '#breadcrumbs-menu': {
                    view: Breadcrumbs,
                    viewOptions: {
                        collection: structure 
                    }
                }
            });

        },

        clobber: {

            toString: function(){
                return 'layout' 
            }

        }
    });
});
