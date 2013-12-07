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
            layout: {
                view: MainLayout,
                viewOptions: {
                    regions: {
                        '#main': {
                            view: View,
                            viewOptions: {
                                name: 'home page main region',
                                keepEl: true
                            }
                        }
                    }
                },
            },
            menuName: 'Home link',
            title: 'Home title'
        }]
    };

});
