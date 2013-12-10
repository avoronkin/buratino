'use strict';

define(function (require) {
    var View = require('regions/View');
    var MainLayout = require('layouts/main/View');

    return {
        slug: '',
        name: 'MainApp',
        pages: [{
            slug: '',
            name: 'home',
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
            menuName: 'Home link',
            title: 'Home title'
        }]
    };

});
