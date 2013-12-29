'use strict';

define(function (require) {
    var View = require('regions/View');
    var MainLayout = require('layouts/main/View');

    return {
        name: 'TestApp2',
        slug: 'test2',
        pages: [{
            slug: '',
            name: '2level1',
            title: '2level1 title',
            menuName: '2level1 link',
            views: {
                '#layout': {
                    constructor: MainLayout,
                    options: {
                        views: {
                            '#main': {
                                constructor: View,
                            }
                        },
                    }
                }
            },
            pages: [{
                slug: '2level2',
                name: '2level2',
                title: '2level2 title',
                menuName: '2level2 link',
                views: {
                    '#layout': {
                        constructor: MainLayout,
                        options: {
                            views: {
                                '#main': {
                                    constructor: View
                                }
                            }
                        }
                    }
                },
                pages: [{
                    slug: '2level3',
                    name: '2level3',
                    title: '2level3 title',
                    menuName: '2level3 link',
                    views: {
                        '#layout': {
                            constructor: MainLayout,
                            options: {
                                views: {
                                    '#main': {
                                        constructor: View
                                    }
                                }
                            }
                        }
                    }
                }]
            }]
        }]
    };

});
