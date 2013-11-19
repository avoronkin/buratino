'use strict';

define(function (require) {
    //var Backbone = require('backbone');
    var Structure = require('core/Structure');
    var Router = require('core/Router');
    var mainApp = require('mainApp/index');
    var TopMenu = require('core/MenuView');
    var mediator = require('./core/mediator');
    var RegionManager = require('./core/RegionManager');

    var router = new Router();
    var structure = new Structure();

    structure.on('change', function(){
        console.log('structure change', structure) 
    })
    var regionManager = new RegionManager();

    var mainRegion = regionManager.addRegion('main', '#main');

    var topMenuRegion = regionManager.addRegion('top-menu', '#top-menu');
    var topMenu = new TopMenu({
        collection: structure,
        itemsContainerSelector: '.items'
    });

    mediator.on('page:change', function (opt) {
        mainRegion.show(opt.view);
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


    mainApp.start();
    topMenuRegion.show(topMenu);

    router.start();
});
