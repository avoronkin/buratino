'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Structure = require('../src/Structure');
var App = require('../src/App.js');
var mediator = require('../src/mediator.js');
var TopMenu = require('./views/topMenu/TopMenu');
var TreeMenu = require('./views/treeMenu/Tree');
var TwoColumn = require('./views/layouts/2column/2column');
var Breadcrumbs = require('./views/breadcrumbs/Breadcrumbs');

var Router = require('../src/Router');
var router = new Router();


var structure = new Structure();

var TwoColumnLayout = {
    constructor: TwoColumn,
    options: {
        views: {
            '#menu': {
                constructor: TopMenu,
                options: {
                    collection: structure
                }
            },
            '#tree': {
                constructor: TreeMenu,
                options: {
                    collection: structure
                }
            },
            '#breadcrumbs': {
                constructor: Breadcrumbs,
                options: {
                    collection: structure
                }
            }
        }
    }
};


var mainApp = new App({
    name: 'mainApp',
    slug: '',
    structure: structure,
    activities: [{
        name: 'home',
        main: true,
        onStart: function(){
            console.log('home started') 
        },
        layout: TwoColumnLayout,
        slug: ''
    }, {
        name: 'level1',
        slug: 'level1',
        layout: TwoColumnLayout,
        activities: [{
            name: 'level2',
            layout: TwoColumnLayout,
            slug: 'level2',
            activities: [{
                name: 'level3',
                layout: TwoColumnLayout,
                slug: 'level3'
            }]
        }]
    }]
});

var subApp = new App({
    name: 'subApp',
    structure: structure,
});

mainApp.mount('sub', subApp);

subApp.addActivities([{
    name: 'subAppMainPage',
    slug: '',
    layout: TwoColumnLayout,
    main: true,
    activities: [{
        name: 'test2',
        layout: TwoColumnLayout,
        slug: 'test2',
        activities: [{
            name: 'test3',
            layout: TwoColumnLayout,
            slug: 'test3'
        }]
    }]
}]);

var subApp2 = new App({
    name: 'subApp2',
    structure: structure,
});

subApp.mount('sub2', subApp2);

subApp2.addActivities([{
    name: 'sub app2 home page',
    layout: TwoColumnLayout,
    slug: '',
    main: true,
    activities: [{
        name: 'level2',
        layout: TwoColumnLayout,
        slug: 'level2',
        activities: [{
            name: 'level33',
            layout: TwoColumnLayout,
            slug: 'level3'
        }]
    }]
}]);


$(document).ready(function () {
console.log('document ready')
    var layout;
    var $el = $('#main');

    mediator.on('activity:start', function (page) {

        if (layout && layout.remove) {
            layout.remove();
        }

        var Constructor = page.get('layout').constructor;
        var options = page.get('layout').options;

        layout = new Constructor(options);
        layout.setElement($el).render();
        var onStart = page.get('onStart');
        if (_.isFunction(onStart)) {
            onStart();
        }
        console.log('activity:start', page, layout, $el);

    });

    mediator.on('router:start', function () {
console.log('router start')
        $('body').on('click', 'a[href^="/"]', function (event) {
            if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                var path = $(event.currentTarget)
                    .attr('href');
                event.preventDefault();
                router.goToUrl(path);
            }
        });
    });
    router.start();

});

mainApp.start();
