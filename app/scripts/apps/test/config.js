'use strict';

define(function (require) {
    var test2config = require('apps/test2/config');
    var View = require('regions/View');
    var View2 = require('regions/View2');
    var MainLayout = require('layouts/main/View');

    return {
        name: 'TestApp',
        slug: 'app1',
        pages: [{
            slug: '',
            name: 'level1',
            views: {
                '#layout': {
                    constructor: MainLayout,
                    options: {
                        views: {
                            '#main': {
                                constructor: View2,
                            }
                        }
                    }
                }
            },
            menuName: 'level1 link',
            title: 'level1 title',
            pages: [{
                slug: 'level2',
                name: 'level2',
                views: {
                    '#layout': {
                        constructor: MainLayout,
                        options: {
                            views: {
                                '#main': {
                                    constructor: View,
                                }
                            }
                        }
                    }
                },
                menuName: 'level2 link',
                title: 'level2 title',
            }]
        }]
    };

});
