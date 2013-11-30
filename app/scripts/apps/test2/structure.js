'use strict';

define(function (require) {
    var View = require('regions/View');

    return {
        name: 'TestApp2',
        slug: 'test2',
        controllers: [{
            slug: '',
            name: '1level1',
            regions: {
                '#main': {
                    view: View,
                }
            },
            menuName: '2Level1 link',
            title: 'level1 title',
            controllers: [{
                slug: 'level2',
                name: '1level2',
                regions: {
                    '#main': {
                        view: View,
                    }
                },
                menuName: '2level2 link',
                title: 'level2 title',
                controllers: [{
                    slug: 'level3',
                    name: '1level3',
                    regions: {
                        '#main': {
                            view: View,
                        }
                    },
                    menuName: '2level3 link',
                    title: 'level3 title'
                }]
            }]
        }]
    };

});
