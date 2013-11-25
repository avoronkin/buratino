'use strict';

define(function (require) {
    var App = require('../core/App');
    // var testApp2 = require('../testApp2/index');
    var TestPageView = require('./pages/TestPageView');
    var TestSubPageView = require('./pages/TestSubPageView');
    var TestSubPage2View = require('./pages/TestSubPage2View');

    var TestApp = App.extend({
        toString: function(){
            return 'TestApp';
        }
    });
    
    var testApp = new TestApp({
        slug: 'test',
        apps: [{
            // app: testApp2,
            slug: 'test2'
        }],
        pages: [{
            view: TestPageView,
            slug: '',
            name: 'level1',
            menuName: 'Level1 link',
            title: 'level1 title',
            pages: [{
                view: TestSubPageView,
                slug: 'level2',
                name: 'level2',
                menuName: 'level2 link',
                title: 'level2 title',
                pages: [{
                    view: TestSubPage2View,
                    slug: 'level3',
                    name: 'level3',
                    menuName: 'level3 link',
                    title: 'level3 title'
                }]
            }]
        }]
    });

    return testApp;
});
