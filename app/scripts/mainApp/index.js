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


    return mainApp;
});
