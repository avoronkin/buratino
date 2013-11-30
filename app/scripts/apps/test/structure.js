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
            parentController: 'level2'
        }],
        controllers: [{
            slug: '',
            name: 'level1',
            regions: {
                '#main': {
                    view: View,
                }
            },
            menuName: 'Level1 link',
            title: 'level1 title',
            controllers: [{
                slug: 'level2',
                name: 'level2',
                regions: {
                    '#main': {
                        view: View,
                    }
                },
                menuName: 'level2 link',
                title: 'level2 title',
                controllers: [{
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
