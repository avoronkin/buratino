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
                options:{
                    collection: structure 
                }
            },
            '#breadcrumbs': {
                constructor: Breadcrumbs,
                options:{
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
    pages: [{
        name: 'home',
        main: true,
        layout: TwoColumnLayout,
        slug: ''
    }, {
        name: 'level1',
        slug: 'level1',
        layout: TwoColumnLayout,
        pages: [{
            name: 'level2',
            layout: TwoColumnLayout,
            slug: 'level2',
            pages: [{
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

subApp.addPages([{
    name: 'subAppMainPage',
    slug: '',
    layout: TwoColumnLayout,
    main: true,
    pages: [{
        name: 'test2',
        layout: TwoColumnLayout,
        slug: 'test2',
        pages: [{
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

subApp2.addPages([{
    name: 'sub app2 home page',
    layout: TwoColumnLayout,
    slug: '',
    main: true,
    pages: [{
        name: 'level2',
        layout: TwoColumnLayout,
        slug: 'level2',
        pages: [{
            name: 'level33',
            layout: TwoColumnLayout,
            slug: 'level3'
        }]
    }]
}]);

mainApp.start();
var page = structure.find(function (model) {
    return model.get('name') === 'level3'
});

$(document).ready(function () {

    var layout;
    var $el = $('#main');

    mediator.on('page:change', function (page) {

        if (layout && layout.remove) {
            layout.remove();
        }

        var Constructor = page.get('layout').constructor;
        var options = page.get('layout').options;

        layout = new Constructor(options);
        layout.setElement($el).render();
        console.log('page:change', page, layout, $el);
    });

    mediator.on('router:start', function () {
        console.log("ready!", router);
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
    router.start();

});

// var topMenu = new TopMenu({
//     structure: structure
// });

// console.log('main test', page, page.getPatch(), structure.toJSON(), mainApp);
