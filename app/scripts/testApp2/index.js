'use strict';

define(function (require) {
    var App = require('../core/App');

    var TestApp = App.extend({
        toString: function(){
            return 'TestApp2';
        }
    });
    
    var testApp = new TestApp({
        slug: 'test2'
    });
   

    var TestPageView = require('./pages/TestPageView');
    var testPage = new TestPageView({
        slug: 'level1',
        name: 'level1',
        menuName: 'level1 link',
        title: 'level1 title'
    });
    
    testApp.addPage(testPage);

    var TestSubPageView = require('./pages/TestSubPageView');
    var testSubPage = new TestSubPageView({
        slug: 'level2',
        name: 'level2',
        parentName: 'level1',
        menuName: 'level2 link',
        title: 'level2 title'
    });
    
    testApp.addPage(testSubPage);

    var TestSubPage2View = require('./pages/TestSubPage2View');
    var testSubPage2 = new TestSubPage2View({
        slug: 'level3',
        name: 'level3',
        parentName: 'level2',
        menuName: 'level3 link',
        title: 'level3  title'
    });
    
    testApp.addPage(testSubPage2);


    return testApp;
});
