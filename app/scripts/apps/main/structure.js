'use strict';

define(function (require) {
    var View = require('core/BaseView');
    var View2 = require('core/TestView');

    return {
        slug: '',
        name: 'MainApp',
        pages: [{
            slug: '',
            name: 'home',
            regions: {
                main: {
                    view: View2,
                    viewOptions: {
                        name: 'home page main region',
                    }
                }
            },
            menuName: 'Home link',
            title: 'Home title'
        }]
    };

});
