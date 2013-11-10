'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var Router = require('core/Router');
    var MainApp = require('mainApp/index');
    var router = new Router();
    var mediator = require('./core/mediator');
    var RegionManager = require('./core/RegionManager');

    var regionManager = new RegionManager();
    var mainRegion = regionManager.addRegion('main', '#main');

    mediator.on('page:change', function (opt) {
        console.log('page:change', opt)
        mainRegion.show(opt.view);
    }, this);

    mediator.on('title:change', function (title) {
        console.log('title:change', title);
        $('title').text(title);
    });

    var mainApp = new MainApp({
        router: router,
        mediator: mediator
    });

    var MainPageView = require('mainApp/pages/MainPageView');
    var mainPageView = new MainPageView({
        router: router,
        mediator: mediator
    });

    var TestPageView = require('mainApp/pages/TestPageView');
    var testPageView = new TestPageView({
        router: router,
        mediator: mediator
    });

    mainApp.addPage(testPageView);
    mainApp.addPage(mainPageView);
    mainApp.start();


    router.start();
});
