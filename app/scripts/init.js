'use strict';

define(function (require) {
    var structure = require('models/structure');
    var App = require('core/App');
    var Router = require('core/Router');
    var mediator = require('core/mediator');
    var Region = require('core/Region');

    var router = new Router();

    var mainRegion = new Region({
        el: '#layout'
    });

    mediator.on('page:change', function (opt) {
        console.log('page:change',opt);
        var View = opt.layout.view;
        var viewOptions = opt.layout.viewOptions || {};

        mainRegion.show(View, viewOptions);

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


    var mainAppConfig = require('apps/main/config');
    var mainApp = new App(mainAppConfig);
    mainApp.start();

    var testAppConfig = require('apps/test/config');
    var testApp = new App(testAppConfig);
    testApp.start();


    router.start();
});
