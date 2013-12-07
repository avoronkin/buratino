'use strict';

define(function(require){
    var config = {};
    var structure = require('models/structure');

    config.outerTpl = require('jst!regions/sidebarMenu/outerTpl.html');
    config.collection = structure;
    console.log('config',config);

    return config;
});
