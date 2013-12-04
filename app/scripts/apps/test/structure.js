'use strict';

define(function (require) {
    var test2config = require('apps/test2/structure');
    var View = require('regions/View');

    return {
        name: 'TestApp',
        slug: 'test',
        apps: [{
            config: test2config,
            slug: 'test2',
            parent: 'level2'
        }],
        pages: [{
            slug: '',
            name: 'level1',
            regions: {
                '#main': {
                    view: View,
                }
            },
            menuName: 'Level1 link',
            title: 'level1 title',
            pages: [{
                slug: 'level2',
                name: 'level2',
                regions: {
                    '#main': {
                        view: View,
                    }
                },
                menuName: 'level2 link',
                title: 'level2 title',
                pages: [{
                    slug: 'level3',
                    name: 'level3',
                    regions: {
                        '#main': {
                            view: View,
                        }
                    },
                    menuName: 'level3 link',
                    title: 'level3 title'
                }]
            }]
        }]
    };

});
