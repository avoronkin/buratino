/*global require*/
'use strict';

require.config({
    deps: [
        'init'
    ],
    shim: {
        // underscore: {
        //     exports: '_',
       // },
        // handlebars: {
        //     exports: 'Handlebars'
        // },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        history: {
            exports: 'History'
        },
        // jquery: {
        //     exports: 'jQuery'
        // }
    },
    paths: {
        text: '../bower_components/requirejs-text/text',
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
//        underscore: '../bower_components/underscore/underscore',
        history: '../bower_components/history.js/scripts/bundled/html4+html5/native.history',
        crossroads: '../bower_components/crossroads.js/dist/crossroads',
        signals: '../bower_components/js-signals/dist/signals',
        jst: 'libs/jst',
        //handlebars : '../bower_components/handlebars/handlebars',
        //hbs: 'libs/hbs',
        rivets: '../bower_components/rivets/dist/rivets',
        'rivets-backbone': '../bower_components/rivets-backbone-adapter/rivets-backbone',
        advice: '../bower_components/advice/advice',
        adviceFactory: '../bower_components/Backbone.AdviceFactory/advicefactory',
        mediator: 'core/mediator'
    },
    config: {
        jst: {
            templateSettings: {
                variable: 'data'
            }
        }
    },
    map: {
        '*': {
            'Backbone': 'backbone',
            'Backbone.Advice': 'advice',
            '_': 'underscore',
            '$': 'jquery'
        },
    }
});
