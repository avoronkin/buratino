'use strict';

define(function (require) {
    var View = require('core/BaseView');

    return {
        name: 'TestApp2',
        slug: 'test2',
        pages: [{
            slug: '',
            name: '1level1',
            regions: {
                main: {
                    view: View,
                }
            },
            menuName: '2Level1 link',
            title: 'level1 title',
            pages: [{
                slug: 'level2',
                name: '1level2',
                regions: {
                    main: {
                        view: View,
                    }
                },
                menuName: '2level2 link',
                title: 'level2 title',
                pages: [{
                    slug: 'level3',
                    name: '1level3',
                    regions: {
                        main: {
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
