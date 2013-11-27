'use strict';

define(function (require) {
    var View = require('core/BaseView');

    return {
        slug: '',
        name: 'MainApp',
        pages: [{
            slug: '',
            name: 'home',
            regions: {
                main: {
                    view: View,
                    viewOptions: {
                        name: 'home page main region'
                    }
                }
            },
            menuName: 'Home link',
            title: 'Home title'
        }]
    };

});
