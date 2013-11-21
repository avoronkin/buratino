'use strict';

define(function (require) {
    var App = require('../core/App');

    var MainApp = App.extend({
        toString: function(){
            return 'MainApp';
        }
    });
    
    var mainApp = new MainApp({
        appUrl: '/'
    });
   

    var MainPageView = require('mainApp/pages/MainPageView');
    var mainPage = new MainPageView({
        routeLink: '',
        routeName: 'home',
        linkText: 'Home link',
        title: 'Home title'
    });

    mainApp.addPage(mainPage);


    var TestPageView = require('mainApp/pages/TestPageView');
    var testPage = new TestPageView({
        routeLink: 'test',
        routeName: 'test',
        linkText: 'Test link',
        title: 'Test title'
    });
    
    mainApp.addPage(testPage);

    var TestSubPageView = require('mainApp/pages/TestSubPageView');
    var testSubPage = new TestSubPageView({
        routeLink: '/sub-test',
        parentRouteName: 'test',
        routeName: 'sub-test',
        linkText: 'sub test link',
        title: 'sub test title'
    });
    
    mainApp.addPage(testSubPage);

    var TestSubPage2View = require('mainApp/pages/TestSubPage2View');
    var testSubPage2 = new TestSubPage2View({
        routeLink: '/sub-test2',
        parentRouteName: 'test',
        routeName: 'sub-test2',
        linkText: 'sub test 2 link',
        title: 'sub test 2  title'
    });
    
    mainApp.addPage(testSubPage2);


    return mainApp;
});
