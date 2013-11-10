'use strict';

define(function (require) {
    var App = require('../core/App');

    var mainApp = App.extend({
        initialize: function () {
            console.log('initialize mainApp');
        }
    });

    return mainApp;
});
