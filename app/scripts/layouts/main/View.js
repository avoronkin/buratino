'use strict';

define(function (require) {
    var template = require('jst!./template.ejs');
    var TopMenu = require('core/menu/MenuView');
    var topMenuConfig = require('regions/topMenu/topMenuConfig');
    var _ = require('underscore');
    var Factory = require('adviceFactory');

    return Factory.register('layout', {
        base: 'view',

        template: template,

        initialize: function () {
            this.regionManager.addRegion('#top-menu');

            this.regions = _.extend(this.regions, {
                '#top-menu': {
                    view: TopMenu,
                    viewOptions: topMenuConfig
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
