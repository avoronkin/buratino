'use strict';

define(function (require) {
    var App = require('../core/App');
    var TestApp2 = require('testApp2/index');
    var PageView = require('core/page/PageView');

    var TestApp = App.extend({}, {
        name: 'TestApp',
        slug: 'test',
        apps: [{
            app: TestApp2,
            slug: 'test2'
        }],
        pages: [{
            slug: '',
            name: 'level1',
            regions: {
                main: {
                    view: PageView,
                }
            },
            menuName: 'Level1 link',
            title: 'level1 title',
            pages: [{
                slug: 'level2',
                name: 'level2',
                regions: {
                    main: {
                        view: PageView,
                    }
                },
                menuName: 'level2 link',
                title: 'level2 title',
                pages: [{
                    slug: 'level3',
                    name: 'level3',
                    regions: {
                        main: {
                            view: PageView,
                        }
                    },
                    menuName: 'level3 link',
                    title: 'level3 title'
                }]
            }]
        }]
    });

    return TestApp;
});
