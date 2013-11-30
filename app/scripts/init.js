'use strict';

define(function (require) {
    //var Backbone = require('backbone');
    var Structure = require('core/Structure');
    var App = require('core/App');
    var Router = require('core/Router');
    var Menu = require('core/menu/MenuView');
    var SidebarMenu = require('regions/sidebarMenu/SidebarMenuView');
    var mediator = require('core/mediator');
    var RegionManager = require('core/RegionManager');
    var _ = require('underscore');
    var helpers = require('core/templateHelpers');

    _.addTemplateHelpers(helpers);
    
    var router = new Router();
    var structure = new Structure();

    structure.on('change', function () {
        console.log('structure change', structure);
    });

    var regionManager = new RegionManager();

    var mainRegion = regionManager.addRegion('#main');

    var topMenuRegion = regionManager.addRegion('#top-menu');
    var topBarConfig = require('core/menu/config/topbar.config');
    var topMenu = new Menu(_.extend(topBarConfig, {
        collection: structure,
        parentName: 'root'
    }));

    var sidebarMenuRegion = regionManager.addRegion('#sidebar-menu');
    var sideNavConfig = require('core/menu/config/sidenav.config');
    var sidebarMenu = new SidebarMenu(_.extend(sideNavConfig,{
        collection: structure,
        parentName: 'test'
    }));

    mediator.on('page:change', function (opt) {
        regionManager.showRegions(opt.regions)
    }, this);

    mediator.on('title:change', function (title) {
        $('title')
            .text(title);
    });

    mediator.on('router:start', function () {
        $('body')
            .on('click', 'a[href^="/"]', function (event) {
                if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                    var path = $(event.currentTarget)
                        .attr('href');
                    event.preventDefault();
                    router.goToUrl(path);
                }
            });
    });


    var mainAppConfig = require('apps/main/structure');
    var mainApp = new App(mainAppConfig);
    mainApp.start();

    var testAppConfig = require('apps/test/structure');
    var testApp = new App(testAppConfig);
    testApp.start();

    topMenuRegion.show(topMenu);
    sidebarMenuRegion.show(sidebarMenu);

    router.start();
});
