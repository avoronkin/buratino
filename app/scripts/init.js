'use strict';

define(function (require) {
    //var Backbone = require('backbone');
    var Router = require('core/Router');
    var MainApp = require('mainApp/index');
    var mediator = require('./core/mediator');
    var router = new Router({
        mediator: mediator
    });
    var RegionManager = require('./core/RegionManager');

    var regionManager = new RegionManager();
    var mainRegion = regionManager.addRegion('main', '#main');

    mediator.on('page:change', function (opt) {
        console.log('page:change', opt);
        mainRegion.show(opt.view);
    }, this);

    mediator.on('title:change', function (title) {
        console.log('title:change', title);
        $('title').text(title);
    });

    mediator.on('router:start',function(){
        $('body').on('click', 'a[href^="/"]', function (event) {
            if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                var path = $(event.currentTarget).attr('href');
                event.preventDefault();
                router.goToUrl(path);
            }
        });
    });

    var mainApp = new MainApp({
        router: router,
        appUrl: '',
        mediator: mediator
    });

    var MainPageView = require('mainApp/pages/MainPageView');
    var mainPageView = new MainPageView({
        mediator: mediator
    });

    var TestPageView = require('mainApp/pages/TestPageView');
    var testPageView = new TestPageView({
        mediator: mediator
    });

    mainApp.addPage({
        view: testPageView,
        routeLink: '/test',
        routeName: 'test',
        linkText: 'Test link',
        title: 'Test title'
    });
    mainApp.addPage({
        view: mainPageView,
        routeLink: '',
        routeName: 'home',
        linkText: 'Home link',
        title: 'Home title'
 
    });
    mainApp.start();


    router.start();
});
