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
            layout: {
                view: MainLayout,
                viewOptions: {
                    regions: {
                        '#main': {
                            view: View,
                        }
                    },
                }
            },
            menuName: '2level1 link',
            title: '2level1 title',
            pages: [{
                slug: '2level2',
                name: '2level2',
                layout: {
                    view: MainLayout,
                    viewOptions: {
                        regions: {
                            '#main': {
                                view: View,
                            }
                        },
                    }
                },
                menuName: '2level2 link',
                title: '2level2 title',
                pages: [{
                    slug: '2level3',
                    name: '2level3',
                    layout: {
                        view: MainLayout,
                        viewOptions: {
                            regions: {
                                '#main': {
                                    view: View,
                                }
                            },
                        }
                    },
                    menuName: '2level3 link',
                    title: '2level3 title'
                }]
            }]
        }]
    };

});
