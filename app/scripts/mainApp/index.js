'use strict';

define(function (require) {
    var App = require('../core/App');
    var MainPageView = require('mainApp/pages/MainPageView');

    var MainApp = App.extend({
        toString: function(){
            return 'MainApp';
        }
    });
    
    var mainApp = new MainApp({
        slug: '',
        pages: [{
            view: MainPageView,
            slug: '',
            name: 'home',
            menuName: 'Home link',
            title: 'Home title'
        }]
    });
   
    return mainApp;
});
