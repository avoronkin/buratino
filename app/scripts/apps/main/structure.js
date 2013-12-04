'use strict';

define(function (require) {
    var View = require('regions/View');

    return {
        slug: '',
        name: 'MainApp',
        pages: [{
            slug: '',
            name: 'home',
            regions: {
                '#main': {
                    view: View,
                    viewOptions: {
                        name: 'home page main region',
                        keepEl: true
                    }
                }
            },
            menuName: 'Home link',
            title: 'Home title'
        }]
    };

});
