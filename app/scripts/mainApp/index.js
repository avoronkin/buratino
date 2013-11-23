'use strict';

define(function (require) {
    var App = require('../core/App');

    var MainApp = App.extend({
        toString: function(){
            return 'MainApp';
        }
    });
    
    var mainApp = new MainApp({
        slug: ''
    });
   

    var MainPageView = require('mainApp/pages/MainPageView');
    var mainPage = new MainPageView({
        slug: '/',
        name: 'home',
        menuName: 'Home link',
        title: 'Home title'
    });

    mainApp.addPage(mainPage);

    return mainApp;
});
