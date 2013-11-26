'use strict';

define(function (require) {
    var App = require('../core/App');
    var PageView = require('core/page/PageView');

    var MainApp = App.extend({},{
        slug: '',
        name: 'MainApp',
        pages: [{
            slug: '',
            name: 'home',
            regions: {
                main: {
                    view: PageView,
                    viewOptions: {
                        name: 'home page main region'
                    }
                }
            },
            menuName: 'Home link',
            title: 'Home title'
        }]
    });

    return MainApp;
});
