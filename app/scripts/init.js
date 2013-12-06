'use strict';

define(function (require) {
    var structure = require('core/Structure');
    var App = require('core/App');
    var Router = require('core/Router');
    var mediator = require('core/mediator');
    var Region = require('core/Region');
    var _ = require('underscore');
    var helpers = require('core/templateHelpers');

    _.addTemplateHelpers(helpers);

    var router = new Router();

    // var regionManager = new RegionManager();

    // var mainRegion = regionManager.addRegion('#main');

//    var SidebarMenu = require('regions/sidebarMenu/SidebarMenuView');
    // var sidebarMenuRegion = regionManager.addRegion('#sidebar-menu');
    // var sideNavConfig = require('core/menu/config/sidenav.config');
    // var sidebarMenu = new SidebarMenu(_.extend(sideNavConfig, {
    //     collection: structure,
    //     parentName: 'test'
    // }));
    
    var mainRegion = new Region({
        el: '#layout'
    });

    mediator.on('page:change', function (opt) {
        console.log('page:change',opt);
        var View = opt.layout.view;
        var viewOptions = opt.layout.viewOptions || {};
        var view = new View(viewOptions);

        mainRegion.show(view);

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

    // sidebarMenuRegion.show(sidebarMenu);

    router.start();
});
