'use strict';

define(function(require){
    var JST = require('JST');
    var config = {};
    config.outerTpl  = JST['app/scripts/core/menu/templates/foundation/topbar/outerTpl.ejs'];
    config.tagName = 'nav';
    config.className = 'top-bar';


    return config;
});
