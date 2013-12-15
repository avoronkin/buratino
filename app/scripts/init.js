'use strict';

define(function (require) {
    var structure = require('models/structure');
    var App = require('core/App');
    var Router = require('core/Router');
    var mediator = require('core/mediator');
    var _ = require('underscore');
    var router = new Router();

    var views = {};

    mediator.on('page:change', function (page) {
        console.log('page:change',page);

        _.each(page.views, function(view, el){
            console.log('page.views', view)
            if(views[el] && views[el].remove){
                views[el].remove();
            }

            views[el] = new view.constructor(view.options);
            views[el].setElement(el).render();

        });

    });

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
